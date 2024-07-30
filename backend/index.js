const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

const accountSid = 'ACaafc2e6ff5c0184acc427964f8437272'; 
const authToken = 'f1c23138e56b930885feb61c0a5d5175';  
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
