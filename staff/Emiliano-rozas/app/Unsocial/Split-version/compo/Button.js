//Creamos funcion creadora de botones
function Button(text, type) {
    Compo.call(this, document.createElement("button"))

    this.container.innerText = text
    this.container.type = type
}

//Lo hacemos responder a Compo madre y damos condicion de constructora
Button.extends(Compo)

Button.prototype.setText = function (text) {
    this.container.innerText = text
}

Button.prototype.getText = function () {
    return this.container.innerText
}
