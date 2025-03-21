
/**
 * Constructs Span (not Spain, be aware jk) instances
 */
class Span extends Compo {
    constructor(text) {
        super(document.createElement('span'))

        this.container.innerText = text
    }


    setText(text) {
        this.container.innerText = text
    }

    getText() {
        return this.container.innerText
    }
}
