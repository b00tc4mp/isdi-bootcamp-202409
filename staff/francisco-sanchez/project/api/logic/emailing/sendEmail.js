import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { validate } from "com"

if (!process.env.EMAIL_PASS) {
    dotenv.config({ path: '../../.env' })
}

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: 'hourify@nomadwebs.com',
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Acepta certificados no confiables (opcional según el hosting)
    }
})

const sendEmail = async (to, subject, text, html) => {
    validate.email(to)
    validate.text(subject, 'subject')
    validate.text(text, 'text')
    validate.text(html, 'html')


    if (!to || !subject || (!text && !html)) {
        throw new Error('There are missing arguments to send email: to, subject, (text or html)')
    }

    // Configura los detalles del correo
    const mailOptions = {
        from: `"Hourify by Nomadwebs" <${process.env.EMAIL_FROM}>`, // Remitente
        to, // Dirección de correo del destinatario
        subject, // Asunto del correo
        text, // Texto sin formato
        html // HTML opcional para el contenido del correo
    }

    // Intenta enviar el correo
    try {
        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (error) {
        console.error('Error al enviar el correo:', error)
        throw new Error('No se pudo enviar el correo')
    }
}
export default sendEmail