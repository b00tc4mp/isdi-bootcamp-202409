/**
 * Builds Compo instances
 * @param {HTMLElement} container The DOM container of the compo instance
 */
function Compo(container) {
  this.container = container
  this.children = []
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

  if (index > -1) this.parent.children.splice(index, 1)

  this.container.remove()
}

Compo.prototype.addBehavior = function (action, callback) {
  this.container.addEventListener(action, callback)
}

/**
 * Builds Header instances
 * @param {string} className Name the CSS class of the Header instance
 */
function Header(className) {
  Compo.call(this, document.createElement('header'))
  this.container.classList.add(className)
}
Header.extends(Compo)

/**
 * Builds a Heading instance
 * @param {string} text Text inside the heading tag
 * @param {number} level Size of the heading
 */
function Heading(text, level) {
  Compo.call(this, document.createElement('h' + level))
  this.container.innerText = text
}
Heading.extends(Compo)

/**
 * Builds a Picture instance
 * @param {string} imageSrc directory/path of the image
 * @param {string} imageClass Name the CSS class of the Picture instance
 */
function Picture(imageSrc, imageClass) {
  Compo.call(this, document.createElement('img'))
  this.container.src = imageSrc
  this.container.classList.add(imageClass)
}
Picture.extends(Compo)

/**
 * Builds a Form instance
 * @param {string} className Name the CSS class of the Form instance
 */
function Form(className) {
  Compo.call(this, document.createElement('form'))
  this.container.classList.add(className)
}
Form.extends(Compo)

Form.prototype.reset = function () {
  this.container.reset()
}

/**
 * Builds a Label instance
 * @param {string} id Name the for attribute of the Label instance
 * @param {string} text Text inside the label tag
 */
function Label(id, text) {
  Compo.call(this, document.createElement('label'))
  this.container.htmlFor = id
  this.container.innerText = text
}
Label.extends(Compo)

/**
 * Builds an Input instance
 * @param {string} id Name the id attribute of the Input instance
 * @param {string} type Name the type of input
 * @param {string} placeholder Text inside the Input instance
 * @param {boolean} required Gives required attribute to the Input instance
 */
function Input(id, type, placeholder, required) {
  Compo.call(this, document.createElement('input'))
  this.container.id = id
  this.container.type = type
  this.container.placeholder = placeholder
  this.container.required = required
}
Input.extends(Compo)

Input.prototype.getValue = function () {
  return this.container.value
}
Input.prototype.setValue = function (value) {
  this.container.value = value
}
Input.prototype.setType = function (type) {
  this.container.type = type
}

function Icon() {
  Compo.call(this, document.createElement('i'))
  this.container.classList.add('far')
  this.container.classList.add('fa-eye')
  this.container.id = 'icon'
}
Icon.extends(Compo)

/**
 * Builds a Button instance
 * @param {string} id name the id of the Button instance
 * @param {string} type name the type of Button instance
 * @param {string} text text inside the Button instance
 */
function Button(id, type, text) {
  Compo.call(this, document.createElement('button'))
  this.container.id = id
  this.container.type = type
  this.container.innerText = text
}
Button.extends(Compo)

/**
 * Builds a Link instance
 * @param {string} text text inside the Link instance
 * @param {string} href URL of the Link instance
 */
function Link(text, href) {
  Compo.call(this, document.createElement('a'))
  this.container.innerText = text
  this.container.href = href
}
Link.extends(Compo)

function Passwordinput(className, id, type, placeholder, required) {
  Compo.call(this, document.createElement('div'))
  this.container.classList.add(className)

  var input = new Input(id, type, placeholder, required)
  this.add(input)

  var icon = new Icon()
  this.add(icon)

  var isVisible = false
  icon.addBehavior('click', function (event) {
    icon.container.classList.toggle('fa-eye-slash')
    if (!isVisible) {
      input.setType('text')
      isVisible = true
    } else {
      input.setType('password')
      isVisible = false
    }
  })
}
Passwordinput.extends(Compo)

Passwordinput.prototype.getValue = function () {
  return this.children[0].container.value
}
Passwordinput.prototype.setValue = function (value) {
  this.children[0].container.value = value
}

/**
 * Builds a Paragraph instance
 * @param {string} text text inside the Paragraph instance
 */
function Paragraph(text) {
  Compo.call(this, document.createElement('p'))
  this.container.innerText = text
}
Paragraph.extends(Compo)

Paragraph.prototype.setText = function (text) {
  this.container.innerText = text
}
Paragraph.prototype.getText = function () {
  return this.container.innerText
}

/**
 * Builds a Time instance
 * @param {string} text text inside the Time instance
 */
function Time(text) {
  Compo.call(this, document.createElement('time'))
  this.container.innerText = text
}
Time.extends(Compo)

Time.prototype.setText = function (text) {
  this.container.innerText = text
}
Time.prototype.getText = function () {
  return this.container.innerText
}

/**
 * Builds a Preformatted instance
 * @param {string} text text inside the Preformatted instance
 */
function Preformatted(text) {
  Compo.call(this, document.createElement('pre'))
  this.container.innerText = text
}
Preformatted.extends(Compo)

Preformatted.prototype.setText = function (text) {
  this.container.innerText = text
}
Preformatted.prototype.getText = function () {
  return this.container.innerText
}

/**
 * Builds a Code instance
 * @param {string} text text inside the Code instance
 */
function Code(text) {
  Compo.call(this, document.createElement('code'))
  this.container.innerText = text
}
Code.extends(Compo)

Code.prototype.setText = function (text) {
  this.container.innerText = text
}
Code.prototype.getText = function () {
  return this.container.innerText
}

/**
 * 
 * @param {*} text 
 */
function Snippet(title, text) {
  Compo.call(this, document.createElement('div'))

  var title = new Heading(title, 4)
  this.add(title)

  var pre = new Preformatted('')
  var code = new Code(text)
  pre.add(code)

  this.add(pre)
}

Snippet.extends(Compo)