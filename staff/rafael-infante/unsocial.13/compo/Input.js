/**
 * Builds an Input instance
 * @param {string} id Name the id attribute of the Input instance
 * @param {string} type Name the type of input
 * @param {string} placeholder Text inside the Input instance
 * @param {boolean} required Gives required attribute to the Input instance
 */
class Input extends Compo {
  constructor(id, type, placeholder, required) {
    super(document.createElement('input'))
    this.container.id = id
    this.container.type = type
    this.container.placeholder = placeholder
    this.container.required = required
  }

  getValue() {
    return this.container.value
  }
  setValue(value) {
    this.container.value = value
  }
  setType(type) {
    this.container.type = type
  }
}