class Paragraph extends Compo {
    constructor(text) {
    super(document.createElement('p'))
    }

    setText (text) {
        this.container.innerText = text
    }

    getText () {
        return this.container.innerText
    }
}