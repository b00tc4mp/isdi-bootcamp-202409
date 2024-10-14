/**
 * Constructs Link instances
 * 
 * @param {string} text The text of the link
 */
function Link(text) {
    Compo.call(this, document.createElement('a'))
    this.container.href = ''
    this.container.innerText = text
}

Link.extends(Compo)