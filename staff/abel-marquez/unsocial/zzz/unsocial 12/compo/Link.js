/**
 * Constructs Link instances
 * 
 * @param {string} text The text of the link
 */

function Link(text) {
    Compo.call(this, document.createElement('a'))

    this.container.innerText = text
    this.container.href = ''
}

Link.extends(Compo)