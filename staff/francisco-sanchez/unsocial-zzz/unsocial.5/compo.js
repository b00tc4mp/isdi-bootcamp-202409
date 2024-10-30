//OK
function Compo(container) {
    this.children = []
    this.container = container
}

//OK
Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

//OK
Compo.prototype.remove = function () {
    this.container.remove()
}

//NO OK, 
function Form(container) {
    this.children = []
    this.container = container
}

//NO OK
Form.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

//NO esta al compo final de manu 
Form.prototype.remove = function () {
    this.container.remove()
}

//OK
Form.prototype.reset = function () {
    this.container.reset()
}
//OK
//Instancias de botones 
function Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button


//Instancias para Labels
function Label(text, id) {
    Compo.call(this, document.createElement('label'))

    this.container.innerText = text
    this.container.htmlFor = id
}

Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label


//Instancias para Inputs
function Input(type, id) {
    Compo.call(this, document.createElement('input'))

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