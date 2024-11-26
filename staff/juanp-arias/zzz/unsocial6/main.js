//Presentation
let loggedInUser = null

const page = new Compo(document.querySelector('body'))

const title = new Heading('unSocial', 1)
page.add(title)
title.container.classList.add('header')

const loginSection = new Login()
let homeSection
page.add(loginSection)