import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

//TEST: 
// Datos de prueba para el registro
const name = 'Gandalf';
const username = 'greyGandalf7';
const password = 'youshallnotpass';
const passwordRepeat = 'youshallnotpass';
const email = 'gandalf7@themiddleearth.com';
const plan = 'free';
const planExpiryDate = null; // Dejar en null como valor predeterminado
const roles = 'standard'; // Valor predeterminado
const dni = '12345678Z'; // Ejemplo de DNI válido
const surname1 = 'TheGrey';
const surname2 = ''; // Puede estar vacío
const biography = 'A wizard is never late, nor is he early. He arrives precisely when he means to.';
const country = 'Middle-Earth';
const province = 'Mordor';
const city = 'Gondor';
const postalCode = '12345';
const street = 'White Tree Avenue';
const street2 = 'Tower of Ecthelion';
const number = '1';
const flat = null; // Sin información de flat
const legalName = 'Gandalf the Grey';
const website = 'http://themiddleearth.com';
const creationStatus = 'true';
const customers = []; // Sin clientes inicialmente
const ownPacks = []; // Sin packs propios inicialmente
const adquiredPacks = []; // Sin packs adquiridos inicialmente


try {
    const result = await registerUser(name,
        username,
        password,
        passwordRepeat,
        email,
        plan,
        planExpiryDate,
        roles,
        dni,
        surname1,
        surname2,
        biography,
        country,
        province,
        city,
        postalCode,
        street,
        street2,
        number,
        flat,
        legalName,
        website,
        creationStatus,
        customers,
        ownPacks,
        adquiredPacks)

    console.log(result)

} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}