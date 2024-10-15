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