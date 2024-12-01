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