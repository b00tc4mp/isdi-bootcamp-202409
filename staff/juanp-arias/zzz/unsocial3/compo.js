//creación de función constructora para hacer todo apartir de ella. 
//todos los elementos que creemos como 'new compo' aplican sus propiedades, es decir heredan ser de propiedad array y container.(container sirve para añadir elementos)


function Compo(container) {
    this.children = []
    this.container = container
}

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

/**
 * Constructora que crea formularios
 */
function Form() {
    Compo.call(this, document.createElement('form'))//Llama la constructora COMPO para que actúe sobre Form
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

Form.prototype.reset = function () {
    this.container.reset()
}


/**
 * Function que construye el Label de cada formulario creado.
 * @param {string} text 
 * @param {string} id 
 */
function Label(text, id) {
    Compo.call(this, document.createElement('label'))

    this.container.innerText = text //Declaramos que todo lo que sea creado como Label, contiene un texto y un id.
    this.container.htmlFor = id
}

Label.prototype = Object.create(Compo.prototype)//Con esto declaramos que se conecte con Compo
Label.prototype.constructor = Label//Con esto declaramos que su constructor sea la misma function


/**
 * Function que construye Input de cada formulario
 * @param {string} type 
 * @param {string} id 
 */
function Input(type, id) {
    Compo.call(this, document.createElement('input'))

    this.container.type = type
    this.container.id = id
}
Input.prototype = Object.create(Compo.prototype)//Con esto declaramos que se conecte con Compo y herede las propiedades y funciones de compo
Input.prototype.constructor = Input//Con esto declaramos que su constructor sea la misma function

Input.prototype.getValue = function () {
    return this.container.value
}

Input.prototype.setValue = function (value) {
    this.container.value = value
}

/**
 * Function que  crea botones.
 * @param {string} text 
 * @param {string} type 
 */
function Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button

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