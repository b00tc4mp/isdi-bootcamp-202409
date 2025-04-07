/**
 * Suma los milisegundos y un numero random, lo convierte en string y 
 * le quita el punto de los decimales
 * @returns Devuelte un id de tipo string 
 * Lo usaremos para generar ids unicos a usuarios y publicaciones
 */
const uuid = () => (Date.now() + Math.random()).toString(36).replace('.', '')