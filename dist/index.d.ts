import { z } from "zod";
declare const CredentialsTypes: z.ZodObject<{
    host: z.ZodString;
    port: z.ZodNumber;
    secure: z.ZodBoolean;
    auth: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        email: string;
        password: string;
    };
}, {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        email: string;
        password: string;
    };
}>;
type Credentials = z.infer<typeof CredentialsTypes>;
declare class MailService {
    private credentials;
    private transporter;
    constructor(credentials: Credentials);
    sendMail(to: string, subject: string, text: string): Promise<{
        success: boolean;
        messageId: string;
        response: string;
    }>;
}
export default MailService;
