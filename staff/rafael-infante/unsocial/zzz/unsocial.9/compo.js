/**
 * Builds Compo instances
 * @param {HTMLElement} container The DOM container of the compo instance
 */
function Compo(container) {
  this.container = container
  this.children = []
}

Compo.prototype.add = function (child) {
  this.children.push(child)
  this.container.appendChild(child.container)
}

Compo.prototype.remove = function () {
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

Header.prototype = Object.create(Compo.prototype)
Header.prototype.constructor = Header
/**
 * Builds a Heading instance
 * @param {string} text Text inside the heading tag
 * @param {number} level Size of the heading
 */
function Heading(text, level) {
  Compo.call(this, document.createElement('h' + level))
  this.container.innerText = text
}

Heading.prototype = Object.create(Compo.prototype)
Heading.prototype.constructor = Heading
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

Picture.prototype = Object.create(Compo.prototype)
Picture.prototype.constructor = Picture
/**
 * Builds a Form instance
 * @param {string} className Name the CSS class of the Form instance
 */
function Form(className) {
  Compo.call(this, document.createElement('form'))
  this.container.classList.add(className)
}

Form.prototype = Object.create(Compo.prototype)
Form.prototype.constructor = Form

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

Label.prototype = Object.create(Compo.prototype)
Label.prototype.constructor = Label
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

Input.prototype = Object.create(Compo.prototype)
Input.prototype.constructor = Input

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

Icon.prototype = Object.create(Compo.prototype)
Icon.prototype.constructor = Icon

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

Button.prototype = Object.create(Compo.prototype)
Button.prototype.constructor = Button
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

Link.prototype = Object.create(Compo.prototype)
Link.prototype.constructor = Link

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

Passwordinput.prototype = Object.create(Compo.prototype)
Passwordinput.prototype.constructor = Passwordinput

Passwordinput.prototype.getValue = function () {
  return this.children[0].container.value
}

Passwordinput.prototype.setValue = function (value) {
  this.children[0].container.value = value
}