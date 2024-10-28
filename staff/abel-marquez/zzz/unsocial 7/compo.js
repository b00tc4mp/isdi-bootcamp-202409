/**
 * Constructs Compo instances
 * 
 * @param {HTMLElement} container The DOM container of the Compo instance
 */

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

/*function Form(container) {
    Compo.call(this,container)
} 
*/
Compo.prototype.addBehavior = function (type, callback) {
    this.container.addEventListener(type, callback)
}

/**
 * Constructs Form instances
 */
function Form () {
    Compo.call(this, document.createElement('form'))
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

Form.prototype.reset = function () {
    this.container.reset()
}

/**
 * Constructs Button instances
 * 
 * @param {string} text The text of the button
 * @param {string} type The button type
 */
function Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button

/**
 * Constructs Label instances
 * 
 * @param {string} text The text of the label
 * @param {string} id The id of the input to relate with
 */

function Label(text, id) {
    Compo.call(this, document.createElement('label'))

    this.container.innerText = text
    this.container.htmlFor = id
}

Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label

/**
 * Constructs Input instances
 * 
 * @param {string} type The input type
 * @param {string} id The input id
 */

function Input(type, id) {
    Compo.call(this, document.createElement('input'))
    this.container.style.width = '100%'
    this.container.style.boxSizing = 'border-box'

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

Input.prototype.getType = function () {
    return this.container.type
}

Input.prototype.setType = function (type) {
    this.container.type = type
}

/**
 * Constructs Heading instances
 * 
 * @param {string} text The text of the heading
 * @param {number} level The heading level
 */
function Heading(text, level) {
    Compo.call(this, document.createElement('h' + level))

    this.container.innerText = text
}

Heading.prototype = Object.create(Compo.prototype)
Heading.prototype.constructor = Heading


/**
 * Constructs Link instances
 * 
 * @param {string} text The text of the link
 */
function Link(text) {
    Compo.call(this, document.createElement('a'))

    this.container.innerText = text
    this.container.href = ''
}

Link.prototype = Object.create(Compo.prototype)
Link.prototype.constructor = Link

/**
 * Constructs Span instances
 * 
 * @param {string} text The text inside span
 */
function Span(text) {
    Compo.call(this, document.createElement('span'))

    this.container.innerText = text
}

Span.prototype = Object.create(Compo.prototype)
Span.prototype.constructor = Span

Span.prototype.setText = function (text) {
    this.container.innerText = text
}

Span.prototype.getText = function () {
    return this.container.innerText
}

/**
 * Constructs PasswordInput instances
 * 
 * @param {string} id The input id
 */
function PasswordInput(id) {
    Compo.call(this, document.createElement('div'))
    this.container.style.display = 'flex'

    var input = new Input('password', id)
    input.container.style.paddingRight = '18px'
    this.add(input)

    var span = new Span('😌')
    span.container.style.cursor = 'pointer'
    span.container.style.position = 'absolute'
    span.container.style.right = '10px'
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