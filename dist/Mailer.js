"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const nodemailer_1 = __importDefault(require("nodemailer"));
const CredentialsTypes = zod_1.z.object({
    host: zod_1.z.string({ message: "Kindly Provide a Host" }),
    port: zod_1.z.number({ message: "Kindly Provide a Port" }),
    secure: zod_1.z.boolean(),
    auth: zod_1.z.object({
        email: zod_1.z.string({ message: "Kindly Provide an Email" }).email({ message: "Invalid Email Format" }),
        password: zod_1.z.string({ message: "Kindly Provide your Password" })
    })
});
class MailService {
    constructor(credentials) {
        this.credentials = credentials;
        const result = CredentialsTypes.safeParse(credentials);
        if (!result.success) {
            throw new Error("Error Occurred: " + result.error.toString());
        }
        this.transporter = nodemailer_1.default.createTransport({
            host: credentials.host,
            port: credentials.port,
            secure: credentials.secure,
            auth: {
                user: credentials.auth.email,
                pass: credentials.auth.password
            }
        });
    }
    sendMail(to, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.transporter.sendMail({
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
            }
            catch (error) {
                throw new Error(`Email sending failed: ${error.message}`);
            }
        });
    }
}
exports.default = MailService;
