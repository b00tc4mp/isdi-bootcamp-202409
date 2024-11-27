/**
 * Constructs Link instances
 * 
 * @param {string} text The text of the link
 */
class Link extends Compo {
    constructor(text) {
        super(this, document.createElement('a'))

        this.container.innerText = text
        this.container.href = ''
    }

}