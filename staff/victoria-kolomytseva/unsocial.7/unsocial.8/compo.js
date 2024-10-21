/**
 * Constructs Compo instances
 * 
 * @param {HTMLElement} container The DOM container of the Compo instance
 */
function Compo(container) {
    this.children = []
    this.container = container
    this.parent = null
}

Compo.prototype.add = function (child) {
    this.children.push(child)
    child.parent = this

    this.container.appendChild(child.container)
}

Compo.prototype.remove = function () {
    var index = this.parent.children.findIndex(function (child) {
        return child === this
    }.bind(this))

    if (index > -1)
        this.parent.children.splice(index, 1)

    this.container.remove()
}

Compo.prototype.addBehavior = function (type, callback) {
    this.container.addEventListener(type, callback)
}

/**
 * Constructs Form instances
 */
function Form() {
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
function Button(type, text) {
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
function Input(id, type) {
    Compo.call(this, document.createElement('input'))
    this.container.id = id
    this.container.type = type
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
    this.container.href = ''
    this.container.innerText = text
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

Span.prototype = Object.create(Compo.prototype)
Span.prototype.constructor = Span

/**
 * 
 */
function UnorderedList() {
    Compo.call(this, document.createElement('ul'))
}

UnorderedList.prototype = Object.create(Compo.prototype)
UnorderedList.prototype.constructor = UnorderedList

/**
 * 
 */
function ListItem() {
    Compo.call(this, document.createElement('li'))
}

ListItem.prototype = Object.create(Compo.prototype)
ListItem.prototype.constructor = ListItem

/**
 * 
 */
function Image(address) {
    Compo.call(this, document.createElement('img'))

    this.container.src = address
    this.container.style.width = '100%'
}

Image.prototype = Object.create(Compo.prototype)
Image.prototype.constructor = Image

/**
 * 
 * @param {*} text 
 */
function Paragraph(text) {
    Compo.call(this, document.createElement('p'))

    this.container.innerText = text
}

Paragraph.prototype = Object.create(Compo.prototype)
Paragraph.prototype.constructor = Paragraph

Paragraph.prototype.setText = function (text) {
    this.container.innerText = text
}

Paragraph.prototype.getText = function () {
    return this.container.innerText
}

/**
 * 
 * @param {*} text 
 */
function Time(text) {
    Compo.call(this, document.createElement('time'))

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