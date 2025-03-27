const page = new Compo(document.body)

const title = new Heading('Compo', 1)
page.add(title)

const inputTitle = new Heading('Input', 2)
page.add(inputTitle)

const button = new Button('button', 'button', 'Submit')
page.add(button)

const snippet = new Snippet('Demo Input', 'var input = new Input(\'password\', \'password\')\npage.add(input)')
page.add(snippet)

const input = new Input('password', 'password', 'Enter password', true)
page.add(input)

const linkTitle = new Heading('Link', 2)

const snippet2 = new Snippet('Demo Link', 'var link = new Link(\'Google\')\npage.add(link)')
page.add(snippet2)

const link = new Link('Google')
page.add(link)