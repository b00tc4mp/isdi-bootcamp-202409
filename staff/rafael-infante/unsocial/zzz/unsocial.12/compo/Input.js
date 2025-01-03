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