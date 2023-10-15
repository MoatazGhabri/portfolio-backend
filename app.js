const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const app = express();
  const corsOptions = {
    origin: process.env.REACT_APP_DOMAIN, // Use the environment variable
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  // Enable CORS for all routes
  app.use(cors(corsOptions));
  
const port = 5000;

app.use(cors(corsOptions));
app.options('*', cors());
app.use(bodyParser.json());

app.post('/submit-feedback', (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'moatazghabri@gmail.com', // Replace with your email
      pass: 'dqkkbjwvpugivxen', // Replace with your email password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email,
    to: 'moatazghabri@gmail.com', // Remplacez par l'adresse e-mail du destinataire
    subject: `Nouveau feedback de ${firstname} ${lastname}`,
    html: `
      <div style="border: 2px solid #3498db; padding: 20px; border-radius: 10px;">
        <h2 style="color: #3498db;">Nouveau Feedback</h2>
        <p><strong>Prénom:</strong> ${firstname}</p>
        <p><strong>Nom:</strong> ${lastname}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `,
  };
  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true });
    }
  });
});

// Replace this with your actual feedback data storage or database connection logic
const feedbacks = [];

app.get('/feedbacks', (req, res) => {
  res.json(feedbacks);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
