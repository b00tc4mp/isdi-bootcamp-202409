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