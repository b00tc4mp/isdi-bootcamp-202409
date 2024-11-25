//

function Compo(container) {
    this.children = []
    this.container = container
}

Compo.prototype.add = function (child) {
    this.children.push(child) // Par poder montar nuestro comcepto
    this.container.appendChild(child.container) //Para poder montar el HTML
}
Compo.prototype.remove = function () {
    this.container.remove()
}

//Funcion constructora de Form
function Form() {
    Compo.call(this, document.createElement("form"))
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

Form.prototype.reset = function () {
    this.container.reset()
}
function Button(text, type) {
    Compo.call(this, document.createElement("button"))

    this.container.innerText = text
    this.container.type
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button

function Label(text, id) {
    Compo.call(this, document.createElement("label"))

    this.container.innerText = text
    this.container.htmlFor = id
}

Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label

function Input(type, id) {
    Compo.call(this, document.createElement("input"))

    this.container.type = type
    this.container.id = id
}

Input.prototype = Object.create(Compo.prototype)
Input.prototype.constructor = Input

Input.prototype.getValue = function () {
    return this.container.value
}

Input.prototype.setValue = function (value) {
    this.container.value = value
}