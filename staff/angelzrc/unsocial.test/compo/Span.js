/* function Span(text) {
    Compo.call(this, document.createElement('span'))

    this.container.innerText = text
}

Span.extends(Compo)

Span.prototype.setText = function (text) {
    this.container.innerText = text
}

Span.prototype.getText = function () {
    return this.container.innerText
} */

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