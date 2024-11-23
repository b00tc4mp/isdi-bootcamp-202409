const boton = document.querySelector('#boton')
const foto = document.getElementById('foto')
const nombre = document.getElementById('nombre')
const correo = document.getElementById('correo')
const telefono = document.getElementById('telefono')

const generarUsuario = async () => {
  try {
    const url = 'https://randomuser.me/api/'
    const respuesta = await fetch(url)

    const { results } = await respuesta.json()
    console.log(results)
    const datos = results[0]

    foto.src = datos.picture.large
    nombre.innerText = `${datos.name.title}. ${datos.name.first} ${datos.name.last}`
    correo.innerText = datos.email
    telefono.innerText = datos.phone
  } catch (error) {
    console.error(error)
  }
}

boton.addEventListener('click', () => generarUsuario())