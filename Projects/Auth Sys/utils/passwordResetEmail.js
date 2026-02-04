const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const resetPasswordEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Auth Sys" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};


module.exports = resetPasswordEmail