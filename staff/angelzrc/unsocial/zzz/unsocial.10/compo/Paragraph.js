function Paragraph(text) {
    Compo.call(this, document.createElement('p'))

    this.container.innerText = text
}

Paragraph.extends(Compo)

Paragraph.prototype.setText = function (text) {
    thbis.container.innerText = text
}

Paragraph.prototype.getText = function() {
    return this.container.innerText
}
