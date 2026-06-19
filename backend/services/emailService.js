const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS.trim(),
  },
});

transporter.verify()
  .then(() => {
    console.log('✅ SMTP READY');
  })
  .catch((error) => {
    console.error('❌ SMTP ERROR:', error.message);
  });

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log('📧 Sending email...');
    console.log('TO:', to);
    console.log('SUBJECT:', subject);

    const info = await transporter.sendMail({
      from: `"Showroom" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('✅ Email sent:', info.messageId);

    return info;
  } catch (error) {
    console.error('❌ Email error:', error);

    throw error;
  }
};

module.exports = {
  sendEmail,
};