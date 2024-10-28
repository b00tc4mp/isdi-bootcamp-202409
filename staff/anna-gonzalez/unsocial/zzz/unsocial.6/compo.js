//constructs COMPO instances with the DOM container
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

Compo.prototype.addBehaviour = function (type, callback) {
    this.container.addEventListener(type, callback)
}

//constructs FORM instances
function Form() {
    Compo.call(this, document.createElement('form'))
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

Form.prototype.reset = function () {
    this.container.reset()
}

//constructs BUTTON instances with the innerText and the type(submit/click)
function Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button

//constructs LABEL instances with the innerText and the id of the input to relate with
function Label(text, id) {
    Compo.call(this, document.createElement('label'))

    this.container.innerText = text
    this.container.htmlFor = id
}

Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label

//constructs INPUT instances with the type (password/text...) and the id of the label
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

//constructs HEADING instances with the innerText and the heading level
function Heading(text, level) {
    Compo.call(this, document.createElement('h' + level))

    this.container.innerText = text
}

Heading.prototype = Object.create(Compo.prototype)
Heading.prototype.constructor = Heading

//constructs LINK instances with the innerText of the link
function Link(text) {
    Compo.call(this, document.createElement('a'))

    this.container.innerText = text
    this.container.href = ''
}

Link.prototype = Object.create(Compo.prototype)
Link.prototype.constructor = Link

//constructs SPAN instances
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

//constructs PASSWORDINPUT instances
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


PasswordInput.prototype.setValue = function (value) {
    this.container.value = value
}

//UNORDERED LIST compos
function UnorderedList() {
    Compo.call(this, document.createElement('ul'))
}

UnorderedList.prototype = Object.create(Compo.prototype)
UnorderedList.prototype.constructor = UnorderedList

//LIST ITEM compos
function ListItem() {
    Compo.call(this, document.createElement('li'))
}

ListItem.prototype = Object.create(Compo.prototype)
ListItem.prototype.constructor = ListItem

//IMAGE compos
function Image(address) {
    Compo.call(this, document.createElement('img'))

    this.container.src = address
    this.container.style.width = '400px'
    this.container.style.border = '2px solid yellow'
    this.container.style.borderRadius = '10px'
}

Image.prototype = Object.create(Compo.prototype)
Image.prototype.constructor = Image

//PARAGRAPH compos
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

//TIME compos
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