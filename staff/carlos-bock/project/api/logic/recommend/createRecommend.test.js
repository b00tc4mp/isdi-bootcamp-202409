import 'dotenv/config'
import db from 'dat'
import createRecommend from './createRecommend.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return createRecommend(userId, city, country, category, price, link, imageUrl, recommendation, subject)
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())


const userId = '6760110db61639a3fdb87bdb'
const city = 'Madrid'
const country = 'España'
const category = 1
const price = 1
const link = 'https://sede.madrid.es/'
const imageUrl = 'https://tugestionespana.com/wp-content/uploads/2022/10/padron-empadronamiento-madrid-espana-768x768.jpg'
const subject = 'proceso de empadronamiento'
const recommendation = `
Empadronarse en Madrid es un trámite sencillo pero esencial para establecer tu residencia oficial en la ciudad. Este proceso permite a los residentes acceder a servicios municipales, como centros de salud, colegios y ayudas sociales. Sigue estos pasos detallados para completar el proceso sin problemas:  
1. ¿Qué es el empadronamiento?  
El empadronamiento es el registro administrativo que acredita dónde resides. Este registro lo gestiona el Ayuntamiento de Madrid y es obligatorio para todas las personas que viven en el municipio, independientemente de su nacionalidad o situación legal.`


