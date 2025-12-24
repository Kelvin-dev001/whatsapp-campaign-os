import axios from 'axios';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WA_PHONE_NUMBER_ID = process.env.WA_PHONE_NUMBER_ID; // set this in env

export async function sendWhatsAppMessage(to, body) {
  const url = `https://graph.facebook.com/v19.0/${WA_PHONE_NUMBER_ID}/messages`;
  await axios.post(url, {
    messaging_product: 'whatsapp',
    to, // e.g., "254759293030" (no plus) or your recipient E.164 without +
    text: { body }
  }, {
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
}