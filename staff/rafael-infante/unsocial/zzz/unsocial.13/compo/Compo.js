/**
 * Builds Compo instances
 * @param {HTMLElement} container The DOM container of the compo instance
 */
class Compo {
  constructor(container) {
    this.container = container
    this.children = []
    this.parent = null
  }

  add(child) {
    this.children.push(child)
    child.parent = this
    this.container.appendChild(child.container)
  }

  remove() {
    var index = this.parent.children.findIndex(function (child) {
      return child === this
    }.bind(this))

    if (index > -1) this.parent.children.splice(index, 1)

    this.container.remove()
  }

  addBehavior(action, callback) {
    this.container.addEventListener(action, callback)
  }
}