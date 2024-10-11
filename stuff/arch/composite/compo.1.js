


function Compo(name) { // Creamos la funcion de composite.
    this.name = name // le decimos que el compo name tiene un nombre.
    this.children = [] // el iterable children es un array.
}

Compo.prototype.add = function (child) { // añadimos al prototipo compo un hijo.
    this.children.push(child) // le añadimos hijos a los hijos.
}

var doc = new Compo('doc') // creamos la variable doc, le decimos que es un nuevo compo y le damos un nombre ('doc').

var doctype = new Compo('doctype')
var html = new Compo('html')
doc.add(doctype) // le decimos que doctype es hijo de doc.
doc.add(html) // le decimos que html es hijo de doc.


/* En este punto hemos creado: 
- Un padre que es doc, doc tiene 2 hijos:
    - doctype.
    - html. */


var head = new Compo('head')
var body = new Compo('body')
html.add(head) // le decimos que head es hijo de html.
html.add(body) // le decimos que body es hijo de html.


/* En este punto hemos creado: 
- Un padre que es doc, doc tiene 2 hijos:
    - doctype.
    - html, html tiene dos hijos:
        - head
        - body.*/


var h1 = new Compo('h1')
var title = new Compo('Hello, World!')
h1.add(title) // le decimos que el titulo es hijo de h1.


/* A banda hemos creado:
    - h1, h1 tiene un hijo:
        - title, que dentro tiene un string. ('hello, world!') */


var p = new Compo('p')
var desc = new Compo('Lorem ipsum ...')
p.add(desc) // le decimos que desc es hijo de p.


/* A banda hemos creado:
    - p, p tiene un hijo:
        - desc, que dentro tiene un string ('Lorem ipsum...') */


body.add(h1) // le decimos que h1 es hijo de body.
body.add(p) // le decimos que p es hijo de body.



/* En este punto hemos creado: 
- Un padre que es doc, doc tiene 2 hijos:

    - doctype.

    - html, html tiene dos hijos:

        - head

        - body, body tiene dos hijos:

            - h1, h1 tiene un hijo:

                - title, que dentro tiene un string. ('hello, world!')

            - p, p tiene un hijo:

                - desc, que dentro tiene un string ('Lorem ipsum...')*/


console.log(doc) // Llamamos a la funcion doc y nos sale lo que hemos creado.