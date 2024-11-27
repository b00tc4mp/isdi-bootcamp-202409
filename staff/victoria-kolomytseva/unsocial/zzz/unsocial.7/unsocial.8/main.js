
var loggedInUser = null // Variable para reconocer al usuario conectado

var page = new Compo(document.querySelector('body')) // Creamos un componente que contenga a body como container

var title = new Heading('Unsocial', 1) // Título de la página
page.add(title) // Añadimos el título a la página

var login = new Login() // Montamos el login
page.add(login) // Añadimos el login a la page, es decir a la "view" (será lo que veamos al entrar)

var home