
class Span extends Compo {
    constructor(text) {
        super(document.createElement('span'))
        this.container.innerText = text
    }
    setText(text) {
        this.container.innerText = text
    }
    getText(text) {
        return this.container.innerText
    }
}