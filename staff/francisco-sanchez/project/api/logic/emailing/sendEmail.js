import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' }) //by default dotenv load the .env file content in the same path we are, if the file is in other place we should specfy mannually 

export const sendEmail = async (to, subject, text, html) => {
    console.log(process.env.EMAIL_PASS)
    const transporter = nodemailer.createTransport({
        host: 'mail.nomadwebs.com',
        port: 465,
        secure: true,
        auth: {
            user: 'hourify@nomadwebs.com',
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false // Acepta certificados no confiables (opcional según el hosting)
        }
    })

    // Configura los detalles del correo
    const mailOptions = {
        from: '"Hourify by Nomadwebs" <hourify@nomadwebs.com>', // Cambia el nombre de remitente
        to, // Dirección de correo del destinatario
        subject, // Asunto del correo
        text, // Texto sin formato
        html // HTML opcional para el contenido del correo
    };

    // Intenta enviar el correo
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el correo');
    }
}