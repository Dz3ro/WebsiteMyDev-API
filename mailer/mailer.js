const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_SENDER_NAME,
      pass: process.env.MAIL_SENDER_PASS,
    },
  })
);

async function sendMail(msg) {
  var mailOptions = {
    from: process.env.MAIL_SENDER_NAME,
    to: process.env.MAIL_RECEIVER_NAME,
    subject: "DevWebsite Message",
    text: msg,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendMail;
