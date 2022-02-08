module.exports = {
  cors: {
    origin: "http://localhost:1234",
  },
  smtp: {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "otilia.gorczany27@ethereal.email",
      pass: "W3Z9xzYY9GhfNAbWut",
    },
  },
  mail: {
    from: "Test Sender <test.sender@example.com>",
    to: "Test Receiver <test.receiver@example.com>",
    subject: "Test Message",
  },
};
