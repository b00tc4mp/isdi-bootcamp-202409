/**
 * Builds a Heading instance
 * @param {string} text Text inside the heading tag
 * @param {number} level Size of the heading
 */
class Heading extends Compo {
  constructor(text, level) {
    super(document.createElement('h' + level))
    this.container.innerText = text
  }
}