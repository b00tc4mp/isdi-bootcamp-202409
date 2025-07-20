import { validate } from "com";
import { sendEmail } from "./index.js";

// Finished pack email
const emailExpirationWarning = async (to, name, packDescription) => {
    validate.email(to)
    validate.name(name)
    validate.description(packDescription)

    const subject = `Your pack "${packDescription}" has finished!`;
    const text = `Hello ${name},

We wanted to let you know that your pack "${packDescription}" has now finished. 
If you need more time or sessions, please contact your provider to renew or purchase a new pack.

Thank you for choosing us!`;

    const html = `<p>Hello ${name},</p>
<p>We wanted to let you know that your pack <strong>"${packDescription}"</strong> has now finished.</p>
<p>If you need more time or sessions, please contact your provider to renew or purchase a new pack.</p>
<p>Thank you for choosing us!</p>`;

    return sendEmail(to, subject, text, html)
        .then((info) => {
            return info; // Retornar para manejar la promesa si es necesario
        })
        .catch((error) => {
            console.error('Error sending finished pack email:', error.message);
            throw error;
        });
};

export default emailExpirationWarning;