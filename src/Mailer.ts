import { z } from "zod";
import nodemailer from "nodemailer";

const CredentialsTypes = z.object({
  host: z.string({ message: "Kindly Provide a Host" }),
  port: z.number({ message: "Kindly Provide a Port" }),
  secure: z.boolean(),
  auth: z.object({
    email: z.string({ message: "Kindly Provide an Email" }).email({ message: "Invalid Email Format" }),
    password: z.string({ message: "Kindly Provide your Password" })
  })
});

type Credentials = z.infer<typeof CredentialsTypes>;

class MailService {
  private transporter;

  constructor(private credentials: Credentials) {
    const result = CredentialsTypes.safeParse(credentials);
    if (!result.success) {
      throw new Error("Error Occurred: " + result.error.toString());
    }

    this.transporter = nodemailer.createTransport({
      host: credentials.host,
      port: credentials.port,
      secure: credentials.secure,
      auth: {
        user: credentials.auth.email,
        pass: credentials.auth.password
      }
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      const data = await this.transporter.sendMail({
        from: this.credentials.auth.email,
        to,
        subject,
        text,
      });

      if (data.rejected && data.rejected.length > 0) {
        throw new Error(`Failed to send email to: ${data.rejected.join(", ")}`);
      }

      return {
        success: true,
        messageId: data.messageId,
        response: data.response,
      };
    } catch (error: any) {
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }
}

export default MailService;
