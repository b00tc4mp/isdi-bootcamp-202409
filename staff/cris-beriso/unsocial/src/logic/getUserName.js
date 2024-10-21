/**
 * A traves de un id de tipo string obtenemos el nombre del usuario. 
 * Previamente hemos almacenado los datos de los usuarios en forma de string en localStorage.
 * Transformamos la string en objeto a traves de JSON.parse.
 * A traves del metodo find encontramos el nombre al que corresponde dicho id. 
 * 
 * @param {string} userId id del usuario del que queremos obtener el nombre
 * @returns el nombre del usuario obtenido a partir del id
 */
const getUserName = userId => {
  if (typeof userId !== 'string') throw new Error('invalid userId')

  const users = JSON.parse(localStorage.users)

  const user = users.find(user => user.id === userId)

  if (!user) throw new Error('user not found')

  return user.name
}

export default getUserName

