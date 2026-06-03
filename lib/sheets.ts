/**
 * Google Sheets sync helper.
 * Appends a new application row to the configured Google Sheet.
 *
 * TODO: In .env, set:
 *   GOOGLE_SHEET_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY
 */
import { google } from 'googleapis';

export async function appendToGoogleSheet(data: {
  startup_name: string;
  team_head: string;
  phone: string;
  stage: string;
  description: string;
  linkedin_url?: string;
  website_url?: string;
  pitch_video_url?: string;
  created_at: Date;
}) {
  const sheetId    = process.env.GOOGLE_SHEET_ID;
  const email      = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  // Skip sync if credentials are not configured
  if (!sheetId || !email || !privateKey || privateKey.includes('YOUR_KEY_HERE')) {
    console.warn('[Sheets] Google Sheets not configured — skipping sync.');
    return;
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:J',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date(data.created_at).toLocaleString('en-IN'),
          data.startup_name,
          data.team_head,
          data.phone,
          data.stage,
          data.description,
          data.linkedin_url ?? '',
          data.website_url  ?? '',
          data.pitch_video_url ?? '',
        ]],
      },
    });

    console.log('[Sheets] Synced application:', data.startup_name);
  } catch (err) {
    // Non-fatal — log and continue so form submission still succeeds
    console.error('[Sheets] Failed to sync to Google Sheets:', err);
  }
}
