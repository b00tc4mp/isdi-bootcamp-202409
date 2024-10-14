/**
 * Constructs Button instances
 * 
 * @param {string} text The text of the button
 * @param {string} type The button type
 */
function Button(type, text) {
    Compo.call(this, document.createElement('button'))
    this.container.innerText = text
    this.container.type = type
}

Button.extends(Compo)