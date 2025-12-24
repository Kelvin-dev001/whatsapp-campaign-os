import axios from 'axios';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

export async function sendWhatsAppMessage(to, body) {
  const url = 'https://graph.facebook.com/v19.0/me/messages';
  await axios.post(url, {
    messaging_product: 'whatsapp',
    to,
    text: { body }
  }, {
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
}
