/**
 * Constructs Label instances
 * 
 * @param {string} text The text of the label
 * @param {string} id The id of the input to relate with
 */
class Label extends Compo {
    constructor(text, id) {
        super(document.createElement('label'))

        this.container.innerText = text
        this.container.htmlFor = id
    }
}
