var loggedInUser = null;

var page = new Compo(document.querySelector('body'));

var title = new Heading('unSocial',1);
//body.add(title); 
//page.add(title) // if duplication occurs try removing.

var login = new Login();
page.add(login);