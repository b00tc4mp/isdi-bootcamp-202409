function Compo(container) {
    this.children = []
    this.container = container
}
// Utilidad para todas las compo (independientemente de tipo form,value,input,et)

Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

Compo.prototype.remove = function () {
    this.container.remove()
}

Compo.prototype.addBehavior = function (type, callback) {
    this.container.addEventListener(type, callback)
}


//Creamos funcion creadora de formularios 
function Form() {
    Compo.call(this, document.createElement("form"))
}

//Lo hacemos responder a Compo madre y damos condicion de constructora
Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

// Utilidades aplicables a los form
Form.prototype.reset = function () {
    this.container.reset()
}

//Creamos funcion creadora de botones
function Button(text, type) {
    Compo.call(this, document.createElement("button"))

    this.container.innerText = text
    this.container.type = type
}

//Lo hacemos responder a Compo madre y damos condicion de constructora
Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button


//Creamos funcion creadora de labels
function Label(text, id) {
    Compo.call(this, document.createElement("label"))
    this.container.innerText = text
    this.container.htmlFor = id

}
//Lo hacemos responder a Compo madre y damos condicion de constructora
Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label


//Creamos funcion creadora de inputs
function Input(type, id) {
    Compo.call(this, document.createElement("input"))

    this.container.type = type
    this.container.id = id

}

//Lo hacemos responder a Compo madre y damos condicion de constructora
Input.prototype = Object.create(Compo.prototype)
Input.prototype.constructor = Button


// Utilidades aplicables a los Inputs
Input.prototype.getValue = function () {
    return this.container.value
}

Input.prototype.setValue = function (value) {
    this.container.value = value
}

Input.prototype.getType = function () {
    this.container.type
}

Input.prototype.setType = function (type) {
    this.container.type = type
}


// Creamos funcion invocadora de Titulos
function Heading(text, level) {
    Compo.call(this, document.createElement("h" + level))
    this.container.innerText = text

}
// La vinculamos con funcion madre y le damos condicion de creadora
Heading.prototype = Object.create(Compo.prototype)
Heading.prototype.constructo = Heading


//Creamos funcion invocadora de Anchors
function Link(text) {
    Compo.call(this, document.createElement("a"))
    this.container.innerText = text
    this.container.href = ""

}

// La vinculamos con funcion madre y le damos condicion de creadora
Link.prototype = Object.create(Compo.prototype)
Link.prototype.constructor = Link

//Creamos span
function Span(text) {
    Compo.call(this, document.createElement("span"))

    this.container.innerText = text
}
Span.prototype = Object.create(Compo.prototype)
Span.prototype.constructor = Span

//funcionalidades de span (para poner y obtener texto)

Span.prototype.setText = function (text) {
    this.container.innerText = text
}

Span.prototype.getText = function () {
    return this.container.innerText
}

/**
 * 
 * @param {string} id 
 */

function PasswordInput(id) {
    Compo.call(this, document.createElement('div'))

    var input = new Input('password', id)
    this.add(input)

    var span = new Span('😌')
    span.container.style.cursor = 'pointer'
    this.add(span)

    span.addBehavior('click', function () {
        if (span.getText() === '😌') {
            input.setType('text')
            span.setText('😳')
        } else {
            input.setType('password')
            span.setText('😌')
        }
    })
}

PasswordInput.prototype = Object.create(Compo.prototype)
PasswordInput.prototype.constructor = PasswordInput

PasswordInput.prototype.getValue = function () {
    return this.children[0].container.value
}

PasswordInput.prototype.setValue = function (value) {
    this.container.value = value
}


// creamos las funciones  para aplicar a los post

// lista 
function UnorderedList() {
    Compo.call(this, document.createElement("ul"))
}

UnorderedList.prototype = Object.create(Compo.prototype)
UnorderedList.prototype.constructor = UnorderedList

//item de la lista

function ListItem() {
    Compo.call(this, documet.createElement("li"))
}

ListItem.prototype = Object.create(Compo.prototype)
ListItem.prototype.constructor = ListItem

// De aca sacamos las imagenes
function Image(address) {
    Compo.call(this, document.createElement('img'))

    this.container.src = address
    this.container.style.width = '100%'
}

Image.prototype = Object.create(Compo.prototype)
Image.prototype.constructor = Image

function Paragraph(text) {
    Compo.call(this, document.createElement("p"))
    this.container.innerText = text
}

Paragraph.prototype = Object(Compo.prototype)
Paragraph.prototype.constructor = Paragraph

// Utilidad especifica para imagenes
Paragraph.prototype.setText = function (text) {
    this.container.innerText = text
}

Paragraph.prototype.getText = function () {
    return this.container.innerText
}

function Time(text) {
    Compo.call(this, document.createElement("time"))
    this.container.innerText = text
}

Time.prototype = Object.create(Compo.prototype)
Time.prototype.constructor = Time

Time.prototype.setText = function (text) {
    this.container.innerText = text
}

Time.prototype.getText = function () {
    return this.container.innerText
}
