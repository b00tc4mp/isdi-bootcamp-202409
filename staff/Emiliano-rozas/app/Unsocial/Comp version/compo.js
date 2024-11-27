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




