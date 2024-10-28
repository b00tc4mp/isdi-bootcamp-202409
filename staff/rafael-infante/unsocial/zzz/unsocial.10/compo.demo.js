var page = new Compo(document.body)

var title = new Heading('Compo', 1)
page.add(title)

var inputTitle = new Heading('Input', 2)
page.add(inputTitle)

var input = new Input('password', 'password', 'Enter password', true)
page.add(input)

var input2 = new Passwordinput('password-container', 'password', 'password', 'Enter your password', true)
page.add(input2)