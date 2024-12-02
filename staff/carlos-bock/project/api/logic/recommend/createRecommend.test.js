import 'dotenv/config'
import db from '../../../dat/index.js' //import db from 'dat' // check routes
import createRecommend from './createRecommend.js'

db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL
  .then(() => {
    try {
      return createRecommend(userId, city, country, category, price, link, imageUrl, recommendation)
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())


const userId = '674dd83edb9525488c8f7770'
const city = 'Madrid'
const country = 'España'
const category = 1
const price = 1
const link = 'https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextoid=3e3debb41f6e2410VgnVCM2000000c205a0aRCRD&vgnextchannel=775ba38813180210VgnVCM100000c90da8c0RCRD&vgnextfmt=default'
const imageUrl = 'https://tugestionespana.com/wp-content/uploads/2022/10/padron-empadronamiento-madrid-espana-768x768.jpg'
const recommendation = `
Empadronarse en Madrid es un trámite sencillo pero esencial para establecer tu residencia oficial en la ciudad. Este proceso permite a los residentes acceder a servicios municipales, como centros de salud, colegios y ayudas sociales. Sigue estos pasos detallados para completar el proceso sin problemas:  

1. ¿Qué es el empadronamiento?  
El empadronamiento es el registro administrativo que acredita dónde resides. Este registro lo gestiona el Ayuntamiento de Madrid y es obligatorio para todas las personas que viven en el municipio, independientemente de su nacionalidad o situación legal.  

2. Documentos necesarios  
Para realizar el trámite, asegúrate de tener los siguientes documentos:  
- Identificación personal: Pasaporte, DNI o NIE (original y copia).  
- Comprobante de domicilio:  
  - Contrato de alquiler o escritura de la vivienda.  
  - Recibo reciente de suministros (agua, luz, gas) a tu nombre.  
  - Si no eres el titular de la vivienda, una autorización firmada por el propietario o titular del contrato y copia de su documento de identidad.  
- Formulario de empadronamiento: Disponible en la web del Ayuntamiento o en la oficina municipal.  

3. Cómo solicitar cita previa  
El trámite requiere cita previa, que puedes gestionar en línea o por teléfono:  
- En línea: Visita el portal del Ayuntamiento de Madrid (https://www.madrid.es). Busca la sección de empadronamiento y selecciona tu junta municipal según tu domicilio.  
- Por teléfono: Llama al 010 (desde Madrid) o al +34 915 298 210 (fuera de Madrid).  

4. Asistencia a la cita  
El día de la cita, acude a la junta municipal correspondiente con todos los documentos requeridos. Llega con al menos 10 minutos de antelación para evitar retrasos.  
- En la oficina:  
  - Presenta tus documentos.  
  - Completa el formulario de alta en el padrón, que te entregarán en la oficina si no lo llevas previamente impreso.  
  - Si compartes vivienda, asegúrate de llevar la autorización del titular y su identificación.  

5. Recepción del volante de empadronamiento  
- Una vez completado el trámite, recibirás un volante de empadronamiento.  
- En algunos casos, el volante se entrega en el acto; en otros, puede llegar por correo a tu domicilio en un plazo de 5 a 10 días.  

6. Renovación y actualización del padrón  
El empadronamiento no tiene una fecha de caducidad, pero es importante mantenerlo actualizado en caso de:  
- Cambio de domicilio.  
- Modificaciones en los datos personales (como cambio de nombre o estado civil).  

7. ¿Qué hacer si no tienes contrato de alquiler o vives de forma irregular?  
Si no puedes aportar un contrato de alquiler o escritura, solicita una autorización firmada del titular de la vivienda. En casos excepcionales, el Ayuntamiento puede aceptar una declaración jurada o un informe de servicios sociales.  

8. Consejos útiles  
- Antes de acudir a la cita, verifica que todos los documentos sean válidos y estén actualizados.  
- Si necesitas el volante con urgencia, infórmate sobre las opciones de tramitación exprés.  
- Guarda una copia del volante de empadronamiento, ya que puede ser necesario para otros trámites administrativos.  

9. Ventajas del empadronamiento  
Empadronarte en Madrid te permite:  
- Acceder al sistema de salud pública.  
- Inscribir a tus hijos en colegios públicos o concertados.  
- Solicitar ayudas sociales y subvenciones.  
- Tramitar permisos de residencia o nacionalidad.  
- Demostrar tu residencia para el carnet de conducir o apertura de cuentas bancarias.  

10. ¿Qué hacer si tienes problemas durante el proceso?  
Si encuentras dificultades, puedes:  
- Contactar al servicio de atención al ciudadano del Ayuntamiento llamando al 010.  
- Consultar con asociaciones de ayuda a migrantes o servicios sociales.  
- Pedir ayuda en las oficinas municipales.  
`;


