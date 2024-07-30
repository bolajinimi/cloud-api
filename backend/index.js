const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(express.json());

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.post('/send-pdf', async (req, res) => {
  const { to, pdfUrl } = req.body;

  try {
    const message = await client.messages.create({
      body: 'Here is your PDF',
      from: 'whatsapp:+14155238886', 
      to: `whatsapp:${to}`,
      mediaUrl: [pdfUrl],
    });

    res.status(200).send({ success: true, message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
