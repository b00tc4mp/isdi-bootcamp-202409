/**
 * Constructs Heading instances
 * 
 * @param {string} text The text of the heading
 * @param {number} level The heading level
 */
function Heading(text, level) {
  Compo.call(this, document.createElement('h' + level))

  this.container.innerText = text
}

Heading.extends(Compo)