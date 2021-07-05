const express = require("express");
const router = express.Router();
const sendMail = require("../mailer/mailer");

router.post("/", async (req, res) => {
  if (!req.body.text) return res.status(400).send("Bad request");
  const text = req.body.text;

  try {
    sendMail(text);
    return res.status(200).send("Mail sent");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
