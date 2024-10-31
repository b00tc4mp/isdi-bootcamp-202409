/**
 * Constructs Button instances
 * 
 * @param {string} text The text of the button
 * @param {string} type The button type
 */
class Button extends Compo {
    constructor(text, type) {
    super(document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}
}

