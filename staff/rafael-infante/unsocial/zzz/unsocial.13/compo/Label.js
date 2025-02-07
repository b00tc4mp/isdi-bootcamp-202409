/**
 * Builds a Label instance
 * @param {string} id Name the for attribute of the Label instance
 * @param {string} text Text inside the label tag
 */
class Label extends Compo {
  constructor(id, text) {
    super(document.createElement('label'))
    this.container.htmlFor = id
    this.container.innerText = text
  }
}