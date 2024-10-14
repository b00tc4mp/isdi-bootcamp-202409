//Creamos span
function Span(text) {
    Compo.call(this, document.createElement("span"))

    this.container.innerText = text

}
Span.extends(Compo)
//funcionalidades de span (para poner y obtener texto)

Span.prototype.setText = function (text) {
    this.container.innerText = text
}

Span.prototype.getText = function () {
    return this.container.innerText
}

Span.prototype.setValue = function (value) {
    this.container.value = value
}