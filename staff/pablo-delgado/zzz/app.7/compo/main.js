const page = new Compo(document.body)

const title = new Heading('Compo v0.0.5', 1)
page.add(title)

{
    const inputTitle = new Heading('Input', 2)
    page.add(inputTitle)

    const snippet = new Snippet('Demo', 'const input = new Input(\'password\', \'password\')\npage.add(input)')
    page.add(snippet)

    const input = new Input('password', 'password')
    page.add(input)
}

{
    const linkTitle = new Heading('Link', 2)
    page.add(linkTitle)

    const snippet = new Snippet('Demo', 'var link = new Link(\'Google\')\npage.add(link)')
    page.add(snippet)

    const link = new Link('Google')
    page.add(link)
}

{
    const passwordInputTitle = new Heading('PasswordInput', 2)
    page.add(passwordInputTitle)

    const snippet = new Snippet('Demo', 'var passwordInput = new PasswordInput(\'password\')\npage.add(passwordInput)')
    page.add(snippet)

    const passwordInput = new PasswordInput('password')
    page.add(passwordInput)
}