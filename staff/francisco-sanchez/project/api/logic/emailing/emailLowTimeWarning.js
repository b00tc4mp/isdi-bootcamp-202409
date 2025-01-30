import { sendEmail } from "./index.js"
import { validate } from "com"
import { getDecimalToTimeFormat } from "../../helpers/index.js"

// Low time warning email
const emailLowTimeWarning = async (to, name, packDescription, packUnit, remainingQuantity) => {
    validate.email(to)
    validate.name(name)
    validate.description(packDescription)
    validate.units(packUnit)

    let remainingFormatedlQtt = ''
    if (packUnit === 'hours') {
        try {
            remainingFormatedlQtt = await getDecimalToTimeFormat(remainingQuantity)
        } catch (error) {
            throw error
        }
    } else {
        remainingFormatedlQtt = remainingQuantity
    }



    const subject = `Your pack "${packDescription}" is running low!`
    const text = `Hello ${name}

We wanted to let you know that your pack "${packDescription}" is running low, with ** ${remainingFormatedlQtt} ** ${packUnit} remaining. 
If you need more time or sessions, please contact your provider to renew or purchase a new pack.

Thank you for choosing us!`

    const html = `<p>Hello ${name},</p>
<p>We wanted to let you know that your pack <strong>"${packDescription}"</strong> is running low, with <strong>${remainingFormatedlQtt}</strong> ${packUnit} remaining.</p>
<p>If you need more time or sessions, please contact your provider to renew or purchase a new pack.</p>
<p>Thank you for choosing us!</p>`



    return sendEmail(to, subject, text, html)
        .then((info) => {
            return info // Retornar para manejar la promesa si es necesario
        })
        .catch((error) => {
            console.error('Error sending low time warning email:', error.message)
            throw error
        })
}

export default emailLowTimeWarning
