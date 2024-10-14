var page = new Compo(document.body)

var title = new Heading('Compo v0.0.5', 1)
page.add(title)

{
  var inputTitle = new Heading('Input', 2)
  page.add(inputTitle)

  var snippet = new Snippet('Demo', 'var input = new Input(\'password\', \'password\')\npage.add(input)')
  page.add(snippet)

  var input = new Input('password', 'password')
  page.add(input)
}

{
  var linkTitle = new Heading('Link', 2)
  page.add(linkTitle)

  var snippet = new Snippet('Demo', 'var link = new Link(\'Google\')\npage.add(link)')
  page.add(snippet)

  var link = new Link('Google')
  page.add(link)
}

{
  var passwordInputTitle = new Heading('PasswordInput', 2)
  page.add(passwordInputTitle)

  var snippet = new Snippet('Demo', 'var passwordInput = new PasswordInput(\'password\')\npage.add(passwordInput)')
  page.add(snippet)

  var passwordInput = new PasswordInput('password')
  page.add(passwordInput)
}