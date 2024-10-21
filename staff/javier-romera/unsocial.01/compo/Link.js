/**
 * Constructs Link instances
 * 
 * @param {string} text The text of the link
 */
class Link extends Compo {
    constructor(text) {
        super(document.createElement('a'))
        this.container.href = ''
        this.container.innerText = text
    }
}