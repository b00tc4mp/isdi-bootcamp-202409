function Span(text) {
    Compo.call(this, document.createElement('span'))

    this.container.innerText = text
}

Span.extends(Compo)

Span.prototype.setText = function (text) {
    this.container.innerText = text
}

Span.prototype.getText = function () {
    return this.container.innerText
}