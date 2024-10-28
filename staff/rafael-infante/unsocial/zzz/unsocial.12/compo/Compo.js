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