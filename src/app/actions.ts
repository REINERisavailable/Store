"use server";

import { google } from "googleapis";

export async function submitOrder(orderData: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    // If we don't have real credentials or sheet ID, we fake success for MVP preview
    if (!spreadsheetId || !process.env.GOOGLE_CLIENT_EMAIL) {
      console.log("[MOCK] Order submitted: ", orderData);
      return { success: true, mock: true };
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F", // Adjust this range based on your sheet
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            orderData.date,
            orderData.fullName,
            orderData.contact,
            orderData.address,
            orderData.productName,
            orderData.price
          ]
        ]
      }
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { success: false, error: "Failed to submit order" };
  }
}
