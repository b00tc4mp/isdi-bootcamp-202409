let loggedInUser = null

const page = new Compo(document.querySelector('body'))

    const title = new Heading('Welcome to Unsocial', 1)
    page.add(title)

    let login = new Login()

    page.add(login)

    let home

