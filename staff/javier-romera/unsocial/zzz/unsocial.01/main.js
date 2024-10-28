let loggedInUser = null // Variable para reconocer al usuario conectado

const page = new Compo(document.querySelector('body')) // Creamos un componente que contenga a body como container

const title = new Heading('laicosnU', 1) // Título de la página
page.add(title) // Añadimos el título a la página

const login = new Login() // Montamos el login
page.add(login) // Añadimos el login a la page, es decir a la "view" (será lo que veamos al entrar)

let home