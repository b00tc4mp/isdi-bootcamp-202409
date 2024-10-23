/**
 * 
 * @param {*} text 
 */
class Preformatted extends Compo {
    constructor(text) {
        Compo.call(this, document.createElement("pre"))

        this.container.innerText = text
    }

    setText(text) {
        this.container.innerText = text
    }

    getText() {
        return this.container.innerText
    }
}