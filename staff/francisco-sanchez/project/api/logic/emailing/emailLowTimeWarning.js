import { sendEmail } from "./index.js";

// Low time warning email
const emailLowTimeWarning = (to, name, packDescription, remainingQuantity) => {
    // Determina si el aviso es por horas o sesiones

    const subject = `Your pack "${packDescription}" is running low!`;
    const text = `Hello ${name},

We wanted to let you know that your pack "${packDescription}" is running low, with ${remainingQuantity} sesion/hour remaining. 
If you need more time or sessions, please contact your provider to renew or purchase a new pack.

Thank you for choosing us!`;

    const html = `<p>Hello ${name},</p>
<p>We wanted to let you know that your pack <strong>"${packDescription}"</strong> is running low, with <strong>${remainingQuantity}</strong> sesion/hour remaining.</p>
<p>If you need more time or sessions, please contact your provider to renew or purchase a new pack.</p>
<p>Thank you for choosing us!</p>`;

    return sendEmail(to, subject, text, html)
        .then((info) => {
            console.log('Low time warning email sent:', info);
            return info; // Retornar para manejar la promesa si es necesario
        })
        .catch((error) => {
            console.error('Error sending low time warning email:', error.message);
            throw error;
        });
};

export default emailLowTimeWarning;
