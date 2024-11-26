/**
 * Function que  crea botones.
 * @param {string} text 
 * @param {string} type 
 */
class Buttonlike extends Compo {
    constructor(text, type) {
        super(document.createElement('button'))

        this.container.innerText = text
        this.container.type = type
    }
}
