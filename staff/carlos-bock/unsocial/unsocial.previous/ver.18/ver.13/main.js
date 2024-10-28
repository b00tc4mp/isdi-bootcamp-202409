let loggedInUser = null; 

const page = new Compo(document.querySelector('body'));

const title = new Heading('unSocial', 1);
page.add(title);

const login = new Login();
page.add(login);

let home;