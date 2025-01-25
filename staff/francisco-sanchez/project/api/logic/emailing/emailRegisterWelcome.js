import { sendEmail } from "./index.js";

//Confirmation register email
const emailRegisterWelcome = (to, name) => {

    const subject = 'Welcome to Hourify'
    const text = `Hello ${name}, this is your confirmation email`
    const html = `<p>Hello ${name}!!</p><p>this is your confirmation email. We just want to confirm you than your new account has been createt correctly and you can get in just <a href="http://localhost:5173/login">clicking here</a></p>`

    return sendEmail(to, subject, text, html)
        .then((info) => {
            //console.log('Welcome email sent:', info);
            return info; // Retornar para permitir manejar la promesa en otro lugar si es necesario
        })
        .catch((error) => {
            console.error('Error sending welcome email:', error.message);
            throw error;
        });
}
export default emailRegisterWelcome