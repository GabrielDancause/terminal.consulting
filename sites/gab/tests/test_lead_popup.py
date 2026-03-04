import pytest
from playwright.sync_api import Page, expect
import time

PORT = 8000
BASE_URL = f"http://localhost:{PORT}/index.html"

def test_popup_conditions(page: Page, server):
    """
    Test that canShowLeadPopup returns expected boolean based on localStorage conditions.
    """
    scenarios = [
        ({}, True),  # Happy path
        ({'gab_customer': '1'}, False),
        ({'gab_lead_captured': '1'}, False),
        ({'gab_lead_popup_dismissed': '1'}, False),
    ]

    for local_storage, expected in scenarios:
        # Clear storage first
        page.goto(BASE_URL)
        page.evaluate("localStorage.clear()")

        # Set conditions
        for k, v in local_storage.items():
            page.evaluate(f"localStorage.setItem('{k}', '{v}')")

        # Reload to apply
        page.reload()

        # Check exposed function
        # We need to wait for JS to load. The function is exposed immediately inside IIFE,
        # but deferred script means we should wait for load event or just wait a bit.
        page.wait_for_load_state("domcontentloaded")

        # Ensure GAB object exists
        page.wait_for_function("window.GAB !== undefined")

        result = page.evaluate("window.GAB.canShowLeadPopup()")
        assert result == expected, f"Failed for {local_storage}: expected {expected}, got {result}"

def test_popup_trigger_scroll(page: Page, server):
    """
    Test that scrolling triggers the popup when conditions are met.
    """
    page.goto(BASE_URL)
    page.evaluate("localStorage.clear()")
    page.reload()
    page.wait_for_load_state("domcontentloaded")

    # Verify popup is not visible initially
    expect(page.locator("#leadMagnetModal")).not_to_be_visible()

    # Scroll to bottom
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

    # Wait for popup to become active
    try:
        page.wait_for_selector("#leadMagnetModal.active", timeout=5000)
    except:
        pytest.fail("Popup did not appear on scroll")

    expect(page.locator("#leadMagnetModal")).to_be_visible()

def test_popup_prevention_on_scroll(page: Page, server):
    """
    Test that scrolling does NOT trigger popup if user is a customer.
    """
    page.goto(BASE_URL)
    page.evaluate("localStorage.setItem('gab_customer', '1')")
    page.reload()
    page.wait_for_load_state("domcontentloaded")

    # Scroll to bottom
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

    # Wait a bit to ensure it DOESN'T show
    # Since we can't wait for "something not to happen", we wait a reasonable time
    page.wait_for_timeout(2000)

    expect(page.locator("#leadMagnetModal")).not_to_be_visible()
