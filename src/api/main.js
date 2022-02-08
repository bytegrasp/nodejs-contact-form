const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const env = process.env.NODE_ENV || "development";
const config = require(`./config.${env}`);

(async () => {
  const host = process.env.HOST || "127.0.0.1";
  const port = process.env.PORT || 3000;

  const app = express()
    .use(express.json(), cors(config.cors))
    .post(
      "/contact",
      body("name").isLength({ min: 1 }).trim().escape(),
      body("email").isEmail({ require_tld: false }).normalizeEmail(),
      body("url_t").isEmpty() /* trap field for bots that must not be filled */,
      body("message").isLength({ min: 1 }).trim().escape(),
      async (req, res) => {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
          return res.status(400).json({ errors: validation.array() });
        }

        try {
          const transport = nodemailer.createTransport(config.smtp);
          const mailBody = `Name: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message}\n`;
          const mail = Object.assign({ text: mailBody }, config.mail);
          const info = await transport.sendMail(mail);

          if (process.env.NODE_ENV != "production") {
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
          res.status(200).end();
        } catch (error) {
          console.log(error);
          res.status(500).end();
        }
      }
    )
    .listen(port, host, () =>
      console.log(`API running at http://${host}:${port}`)
    );

  function shutdown() {
    app.close(() => {
      process.exit();
    });
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("SIGQUIT", shutdown);
})();
