var page = new Compo(document.body)

var title = new Heading("Compo", 1)
page.add(title)

{
    var inputTitle = new Heading("Input", 2)
    page.add(inputTitle)

    var input = new Input("password", "password")
    page.add(input)
    var linkTitle = new Heading("Link", 2)
    page.add(linkTitle)

}

{
    var passwordInputTitle = new Heading("Link", 2)
    page.add(passwordInputTitle)

    var link = new Link("Google")
    page.add(link)
}

{
    var passwordInputTitle = new Heading("PasswordInput", 2)
    page.add(passwordInputTitle)

    var passwordInput = new passwordInput("password")
    page.add(passwordInput)
}