import 'dotenv/config'
import db from 'dat'
import updateUser from './updateUser.js'

await db.connect(process.env.MONGO_URL)

const userId = '6762dba622333bfc20ee5487' //risto
const targetUserId = '6762dba622333bfc20ee5487' //risto
const targetUserIdDifferent = '67640e5e2568e5139854dd58' //fotocesc
const username = 'risto'
const email = 'evolucionayvive@gmail.com'
const name = 'risto'
const surname1 = 'New Surname 1'
const surname2 = 'New Surname 2'
const dni = '47822716N'
const biography = 'new text for the user bio'
const country = 'Spain'
const province = 'Tarragona'
const city = 'Alcanar'
const postalCode = '43530'
const address1 = 'aspirantat sant jordi'
const address2 = ''
const number = '14'
const flat = 2
const legalName = 'new legal name s.l'
const website = 'https://thegreatwebsite.com'


try {
    const user = await updateUser(userId, targetUserIdDifferent,
        username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website)
    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}