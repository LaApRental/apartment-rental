const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'zoho'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendMail(to, subject, text) {
  const mailOptions = {
    from: `"Apartmani Hrvatska" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendMail;
