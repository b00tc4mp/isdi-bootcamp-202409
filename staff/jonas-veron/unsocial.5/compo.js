function Compo(container){
    this.children = []
    this.container = container
}

Compo.prototype.add = function(child){
    this.children.push(child)
    this.container.appendChild(child.container)
}

Compo.prototype.remove = function() {
    this.container.remove()
}

Compo.prototype.addBehavior = function (type, callback) {
    this.container.addEventListener(type, callback)
}


function Form(){
    Compo.call(this, document.createElement('form'))
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

Form.prototype.reset = function(){
    this.container.reset()
}

function Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button

function Label(text, id){
    Compo.call(this, document.createElement('label'))

    this.container.innerText = text
    this.container.htmlFor = id
}

Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label

function Input(type, id) {
    Compo.call(this, document.createElement('input'))

    this.container.type = type
    this.container.id = id
}

Input.prototype = Object.create(Compo.prototype)
Input.prototype.constructor = Input

Input.prototype.getValue = function() {
    return this.container.value
}

Input.prototype.setValue = function (value) {
    this.container.value = value
}


function Heading(text, level) {
    Compo.call(this, document.createElement('h' + level))

    this.container.innerText = text
}

Heading.prototype = Object.create(Compo.prototype)
Heading.prototype.constructor = Heading

function Link(text) {
    Compo.call(this, document.createElement('a'))

    this.container.innerText = text
    this.container.href = ''
}

Link.prototype = Object.create(Compo.prototype)
Link.prototype.constructor = Link