var loggedInUser = null

var body = new Compo(document.querySelector('body'))

var title = document.createElement('h1')
title.innerText = 'Unsocial'
body.container.appendChild(title)

var loginSection = buildLoginSection()

body.add(loginSection)
