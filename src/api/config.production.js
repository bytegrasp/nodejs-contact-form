module.exports = {
  cors: {
    origin: "https://www.example.com",
  },
  smtp: {
    host: "mx1.example.com",
    port: 587,
    auth: {
      user: "example-user",
      pass: "example-password",
    },
  },
  mail: {
    from: "Example Sender <sender@example.com>",
    to: "Example Receiver <receiver@example.com>",
    subject: "New Message From Contact Form",
  },
};
