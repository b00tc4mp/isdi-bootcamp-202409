//Presentation
var loggedInUser = null

var page = new Compo(document.querySelector('body'))

var title = new Heading('unSocial', 1)
page.add(title)
title.container.classList.add('header')

var loginSection = new Login()
var homeSection
page.add(loginSection)