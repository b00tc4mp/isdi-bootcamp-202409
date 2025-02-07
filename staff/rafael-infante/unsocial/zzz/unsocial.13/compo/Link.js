/**
 * Builds a Link instance
 * @param {string} text text inside the Link instance
 * @param {string} href URL of the Link instance
 */
class Link extends Compo {
  constructor(text, href) {
    super(document.createElement('a'))
    this.container.innerText = text
    this.container.href = href
  }
}