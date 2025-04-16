var loggedInUser = null

var loginSection = buildLoginSection()


// Muestro la sección de login en la página

var body = new Compo(document.querySelector('body'))
body.add(loginSection)