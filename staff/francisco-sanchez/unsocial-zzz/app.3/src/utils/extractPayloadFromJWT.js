export default token => {
    // Encuentra el índice del primer punto ('.') en el token
    const indexFrom = token.indexOf('.')

    // Encuentra el índice del último punto ('.') en el token
    const indexTo = token.lastIndexOf('.')

    // Extrae la parte del token que corresponde al payload (entre los dos puntos)
    // Los tokens JWT tienen la forma: header.payload.signature
    const payloadB64 = token.slice(indexFrom + 1, indexTo)

    // Decodifica la parte del payload que está en base64 (el formato en que se almacena en el token)
    const payloadJSON = atob(payloadB64)

    // Convierte el payload de formato JSON (string) a un objeto JavaScript
    const payload = JSON.parse(payloadJSON)

    // Devuelve el payload como un objeto JavaScript
    return payload
}


/*
Explicación Detallada
JWT (JSON Web Token):

Un JWT es un token que tiene tres partes separadas por puntos (.):

header.payload.signature
header: Metadatos sobre el token (algoritmo, tipo, etc.).
payload: Los datos que contiene el token (como el ID del usuario).
signature: Una firma para validar que el token no ha sido modificado.


¿Qué Hace Este Código?:
Este script extrae y decodifica la parte del token que corresponde al payload, para que puedas leer los datos que contiene.

Paso a Paso del Código:
-----------------------

token.indexOf('.'): Encuentra la posición del primer punto, que separa el header del payload.

token.lastIndexOf('.'): Encuentra la posición del último punto, que separa el payload de la firma.

token.slice(indexFrom + 1, indexTo): Extrae la parte del token entre los dos puntos, que es el payload en formato Base64.

atob(payloadB64): Decodifica el payload de Base64 (formato codificado) a un string JSON.

JSON.parse(payloadJSON): Convierte el string JSON en un objeto JavaScript.

return payload: Devuelve el objeto JavaScript que representa el payload del token.

Ejemplo de Uso: 
---------------

Si tienes un token como este:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Este script:
Extrae y decodifica el payload:

eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9

Lo decodifica de Base64:
{
  "userId": "1234567890",
  "name": "John Doe",
  "admin": true
}

Finalmente, devuelve este objeto como un objeto JavaScript.

Nota Importante:
Este script no valida el token ni su firma, solo extrae el payload. Si necesitas verificar la autenticidad del token, deberías usar una librería como jsonwebtoken.
Espero que con estos comentarios el script sea más claro. ¡Déjame saber si necesitas más explicaciones! 😊







*/