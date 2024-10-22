/**
 * Builds a Heading instance
 * @param {string} text Text inside the heading tag
 * @param {number} level Size of the heading
 */
function Heading(text, level) {
  Compo.call(this, document.createElement('h' + level))
  this.container.innerText = text
}
Heading.extends(Compo)