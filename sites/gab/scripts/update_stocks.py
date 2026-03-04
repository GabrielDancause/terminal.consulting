import os
import json
import urllib.request
import urllib.error
import time
from datetime import datetime
import concurrent.futures

# Configuration
API_KEY = os.environ.get('FMP_API_KEY')
BASE_URL = 'https://financialmodelingprep.com/stable'
TICKERS = [
  'AAPL','MSFT','NVDA','GOOGL','AMZN','META','TSM','AVGO','BRK-B','LLY',
  'JPM','V','WMT','MA','UNH','XOM','COST','HD','PG','JNJ',
  'ABBV','CRM','NFLX','AMD','ORCL','ADBE','DIS','INTC','PFE','KO',
  'PEP','BAC','CVX','CSCO','T'
]

SECTOR_MAP = {
  'Technology': 'Technology',
  'Communication Services': 'Communication Services',
  'Consumer Cyclical': 'Consumer Discretionary',
  'Consumer Defensive': 'Consumer Staples',
  'Financial Services': 'Financials',
  'Healthcare': 'Healthcare',
  'Energy': 'Energy',
  'Industrials': 'Industrials',
  'Basic Materials': 'Materials',
  'Utilities': 'Utilities',
  'Real Estate': 'Real Estate',
}

def fetch_json(url):
    try:
        # User-Agent is sometimes required by APIs
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            if response.status != 200:
                print(f"Error fetching {url}: {response.status}")
                return None
            data = json.loads(response.read().decode())
            if isinstance(data, dict) and data.get('Error Message'):
                print(f"API Error: {data['Error Message']}")
                return None
            return data
    except Exception as e:
        print(f"Exception fetching {url}: {e}")
        return None

def get_stock_data(ticker):
    print(f"Fetching data for {ticker}...")
    time.sleep(1.0) # Rate limit protection

    # Handle BRK.B vs BRK-B (API usually expects BRK-B)
    api_ticker = ticker

    profile_url = f"{BASE_URL}/profile?symbol={api_ticker}&apikey={API_KEY}"
    ratios_url = f"{BASE_URL}/ratios-ttm?symbol={api_ticker}&apikey={API_KEY}"
    metrics_url = f"{BASE_URL}/key-metrics-ttm?symbol={api_ticker}&apikey={API_KEY}"

    profile = fetch_json(profile_url)
    ratios = fetch_json(ratios_url)
    metrics = fetch_json(metrics_url)

    q = profile[0] if profile and len(profile) > 0 else {}
    r = ratios[0] if ratios and len(ratios) > 0 else {}
    m = metrics[0] if metrics and len(metrics) > 0 else {}

    return {
        'ticker': ticker,
        'quote': q,
        'ratios': r,
        'metrics': m
    }

def calculate_score(peg, fcf_yield, div_yield, market_cap_b, metrics):
    score = 0

    # PEG Ratio
    if peg is not None and peg > 0 and peg < 50:
        if peg <= 0.5: score += 35
        elif peg <= 1.0: score += 30
        elif peg <= 1.5: score += 25
        elif peg <= 2.0: score += 18
        elif peg <= 3.0: score += 10
        else: score += 3

    # FCF Yield
    if fcf_yield is not None:
        if fcf_yield >= 8: score += 25
        elif fcf_yield >= 6: score += 20
        elif fcf_yield >= 4: score += 15
        elif fcf_yield >= 2: score += 10
        elif fcf_yield >= 0: score += 4
        else: score += 0

    # Dividend Yield
    if div_yield is not None:
        if div_yield >= 4: score += 15
        elif div_yield >= 3: score += 12
        elif div_yield >= 2: score += 9
        elif div_yield >= 1: score += 6
        elif div_yield > 0: score += 3
        else: score += 0

    # Market Cap
    if market_cap_b >= 1000: score += 10
    elif market_cap_b >= 500: score += 8
    elif market_cap_b >= 200: score += 6
    elif market_cap_b >= 100: score += 4
    else: score += 2

    # ROE
    roe = metrics.get('returnOnEquityTTM') or metrics.get('roeTTM')
    if roe is not None:
        if roe >= 0.30: score += 15
        elif roe >= 0.20: score += 12
        elif roe >= 0.15: score += 9
        elif roe >= 0.10: score += 6
        elif roe >= 0: score += 3
        else: score += 0
    else:
        score += 5

    return min(100, max(0, round(score)))

def process_stock(data):
    ticker = data['ticker']
    q = data['quote']
    r = data['ratios']
    m = data['metrics']

    raw_sector = q.get('sector') or 'Unknown'
    sector = SECTOR_MAP.get(raw_sector, raw_sector)

    market_cap = q.get('marketCap') or q.get('mktCap') or 0
    market_cap_b = market_cap / 1e9

    peg = r.get('priceToEarningsGrowthRatioTTM')

    p2fcf = r.get('priceToFreeCashFlowRatioTTM')
    fcf_yield = (1 / p2fcf * 100) if (p2fcf is not None and p2fcf > 0) else None

    raw_div_yield = r.get('dividendYieldTTM')
    div_yield = (raw_div_yield * 100) if (raw_div_yield is not None and raw_div_yield >= 0) else None

    score = calculate_score(peg, fcf_yield, div_yield, market_cap_b, m)

    display_ticker = 'BRK.B' if ticker == 'BRK-B' else ticker

    return {
        'ticker': display_ticker,
        'company': q.get('companyName') or q.get('name') or ticker,
        'sector': sector,
        'marketCap': round(market_cap_b * 10) / 10,
        'peg': (round(peg * 100) / 100) if (peg is not None and peg > 0 and peg < 100) else None,
        'fcfYield': (round(fcf_yield * 100) / 100) if fcf_yield is not None else None,
        'divYield': (round(div_yield * 100) / 100) if div_yield is not None else None,
        'score': score
    }

def main():
    if not API_KEY:
        print("Error: FMP_API_KEY environment variable not set.")
        return

    print(f"Starting update for {len(TICKERS)} tickers...")

    results = []

    # Use sequential execution to be extremely safe with rate limits
    for ticker in TICKERS:
        try:
            data = get_stock_data(ticker)
            processed = process_stock(data)
            if processed['marketCap'] > 0:
                results.append(processed)
        except Exception as exc:
            print(f'{ticker} generated an exception: {exc}')

    now = datetime.now()
    date_str = now.strftime('%b') + ' ' + str(now.day) + ', ' + now.strftime('%Y')

    output = {
        'timestamp': int(time.time() * 1000),
        'date': date_str,
        'stocks': results
    }

    os.makedirs('data', exist_ok=True)

    with open('data/stocks.json', 'w') as f:
        json.dump(output, f, indent=2)

    print(f"Successfully updated data/stocks.json with {len(results)} stocks.")

if __name__ == "__main__":
    main()
