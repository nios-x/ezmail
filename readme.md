# ezmail

**ezmail** is a simple mailing library built with Zod (https://github.com/colinhacks/zod) for schema validation and Nodemailer (https://nodemailer.com/about/) for sending emails in Node.js.

---

Features

- Schema-validated SMTP credentials using Zod  
- Easy-to-use mail sending with a simple API  
- Error handling for invalid credentials and rejected emails  

---

Installation

npm install ezmail

---

Usage

import MailService from "ezmail/dist/Mailer";

const credentials = {
  host: "smtp.example.com",
  port: 465,
  secure: true,
  auth: {
    email: "your-email@example.com",
    password: "your-email-password"
  }
};

const mailer = new MailService(credentials);

mailer.sendMail("recipient@example.com", "Subject here", "Email body text")
  .then(result => {
    console.log("Email sent:", result);
  })
  .catch(error => {
    console.error("Failed to send email:", error.message);
  });

---

API

new MailService(credentials)

Creates a new mail service instance.

Credentials must include:

- host (string) - SMTP server host  
- port (number) - SMTP server port  
- secure (boolean) - Use TLS or not  
- auth.email (string) - Sender email address (must be a valid email)  
- auth.password (string) - Email account password  

Throws an error if credentials are invalid.

sendMail(to: string, subject: string, text: string)

Sends an email and returns a promise that resolves with the email sending result.

Throws an error if the mail fails to send or if recipients are rejected.

---

License

MIT License © Soumya Jaiswal

---

Links

GitHub: https://github.com/nios-x/ezmail  
LinkedIn: https://www.linkedin.com/in/soumya-jaiswal7708/
