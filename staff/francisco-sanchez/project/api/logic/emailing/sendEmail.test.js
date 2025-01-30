import { sendEmail } from './sendEmail.js'

(async () => {
    try {
        const info = await sendEmail(
            'virtuachezgif@gmail.com',
            'Prueba de Correo asunto',
            'Este es un correo de prueba, en texto plano',
            '<h1>Correo de Prueba</h1><p>Este es un correo de prueba desde Hourify by nomadwebs en html</p>'
        )
    } catch (error) {
        console.error('Error al enviar correo:', error.message)
    }
})()
