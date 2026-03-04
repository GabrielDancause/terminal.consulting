/**
 * Google Apps Script — Email Capture Backend for aliimperiale.com
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Spreadsheet
 * 2. Name the first sheet tab "Emails"
 * 3. Add headers in row 1: Timestamp | Email | Post Slug | Source URL
 * 4. Go to Extensions > Apps Script
 * 5. Delete the default Code.gs content and paste this entire file
 * 6. Click Deploy > New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Authorize when prompted
 * 8. Copy the deployment URL
 * 9. Paste it into email-capture.js (replace PASTE_YOUR_APPS_SCRIPT_URL_HERE)
 *
 * COLUMNS: Timestamp | Email | Post Slug | Source URL
 */

var SHEET_NAME = 'Emails';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var email = (data.email || '').trim().toLowerCase();
    var postSlug = (data.post_slug || '').trim();
    var sourceUrl = (data.source_url || '').trim();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, error: 'Invalid email address' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Email', 'Post Slug', 'Source URL']);
    }

    // Check for duplicate (same email + same post slug)
    var dataRange = sheet.getDataRange().getValues();
    for (var i = 1; i < dataRange.length; i++) {
      if (dataRange[i][1] === email && dataRange[i][2] === postSlug) {
        // Already exists — return success silently (user still gets PDF)
        return jsonResponse({ success: true, duplicate: true });
      }
    }

    // Append new row
    sheet.appendRow([
      new Date().toISOString(),
      email,
      postSlug,
      sourceUrl
    ]);

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'Email capture endpoint active' });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
