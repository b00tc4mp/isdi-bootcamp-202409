/**
 * Builds a Button instance
 * @param {string} id name the id of the Button instance
 * @param {string} type name the type of Button instance
 * @param {string} text text inside the Button instance
 */
class Button extends Compo {
  constructor(id, type, text) {
    super(document.createElement('button'))
    this.container.id = id
    this.container.type = type
    this.container.innerText = text
  }
}