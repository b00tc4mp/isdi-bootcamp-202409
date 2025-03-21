/**
 * Build button part
 */

class Button extends Compo {
    constructor(text, type) {
        super(document.createElement('button'))

        this.container.innerText = text
        this.container.type = type
    }
}
