var page = new Compo(document.body)

var title = new Heading('Compo', 1)
page.add(title)

var inputTitle = new Heading('Input', 2)
page.add(inputTitle)

var snippet = new Snippet('Demo Input', 'var input = new Input(\'password\', \'password\')\npage.add(input)')
page.add(snippet)

var input = new Input('password', 'password', 'Enter password', true)
page.add(input)

var linkTitle = new Heading('Link', 2)

var snippet = new Snippet('Demo Link', 'var link = new Link(\'Google\')\npage.add(link)')
page.add(snippet)

var link = new Link('Google')
page.add(link)