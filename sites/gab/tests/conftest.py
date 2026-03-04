import pytest
from playwright.sync_api import sync_playwright
import threading
import http.server
import socketserver
import os
import time
from functools import partial

PORT = 8000

@pytest.fixture(scope="session")
def server():
    """Start a local HTTP server for the tests."""
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    # Create a request handler pointing to the root directory
    handler = partial(http.server.SimpleHTTPRequestHandler, directory=root_dir)

    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            thread = threading.Thread(target=httpd.serve_forever)
            thread.daemon = True
            thread.start()
            print(f"Server started at port {PORT}")
            yield httpd
            httpd.shutdown()
            print("Server stopped")
    except OSError as e:
        print(f"Failed to start server: {e}")
        # If port is in use, maybe it's already running?
        yield None

@pytest.fixture(scope="module")
def browser_context():
    """Setup Playwright browser."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        yield context
        browser.close()

@pytest.fixture(scope="function")
def page(browser_context):
    """Create a new page for each test."""
    page = browser_context.new_page()
    yield page
    page.close()
