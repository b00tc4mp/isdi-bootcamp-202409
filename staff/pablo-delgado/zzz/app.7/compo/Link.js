/**
 * Build links part
 */

class Link extends Compo {
    constructor(text) {
        super(document.createElement('a'))

        this.container.innerText = text
        this.container.href = ''
    }
}
