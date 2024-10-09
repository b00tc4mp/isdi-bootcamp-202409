var loggedInUser = null

var loginSection = buildLoginSection()

var body = new Compo(document.querySelector('body'))
    body.add(loginSection)