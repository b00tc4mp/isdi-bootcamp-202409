let loggedInUser = null

const page = new Compo(document.querySelector('body'))

    let hasLiked = false

    const title = new Heading('Welcome to Unsocial', 1)
    page.add(title)

    let login = new Login()

    page.add(login)

    let home

