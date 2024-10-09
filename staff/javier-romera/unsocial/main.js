var loggedInUser = null // Variable para reconocer al usuario conectado

var loginSection = buildLoginSection()

var body = new Compo(document.querySelector('body')) // Variable donde almacenamos el body
body.add(loginSection) // El inicial, empezamos la página enseñando el login