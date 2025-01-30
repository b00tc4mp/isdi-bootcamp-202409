import { sendEmail } from "./index.js"
import { validate } from "com"

// Near expiry time email
const emailNearExpiryTime = async (to, name, packDescription, expiryDate) => {
    validate.email(to)
    validate.name(name)
    validate.description(packDescription)
    validate.date(expiryDate)

    const subject = `Your pack "${packDescription}" is about to expire!`
    const text = `Hello ${name},

We wanted to let you know that your pack "${packDescription}" is approaching its expiry date on **${expiryDate.toLocaleDateString()}**. 
If you need more time or sessions, please contact your provider to renew or purchase a new pack.

Thank you for choosing us!`

    const html = `<p>Hello ${name},</p>
<p>We wanted to let you know that your pack <strong>"${packDescription}"</strong> is approaching its expiry date on <strong>${expiryDate.toLocaleDateString()}</strong>.</p>
<p>If you need more time or sessions, please contact your provider to renew or purchase a new pack.</p>
<p>Thank you for choosing us!</p>`

    return sendEmail(to, subject, text, html)
        .then((info) => {
            return info // Retornar para manejar la promesa si es necesario
        })
        .catch((error) => {
            console.error('Error sending near expiry time email:', error.message)
            throw error
        })
}

export default emailNearExpiryTime
