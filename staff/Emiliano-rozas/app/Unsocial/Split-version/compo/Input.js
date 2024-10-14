//Creamos funcion creadora de inputs
function Input(type, id) {
    Compo.call(this, document.createElement("input"))

    this.container.type = type
    this.container.id = id

}

//Lo hacemos responder a Compo madre y damos condicion de constructora
Input.extends(Compo)


// Utilidades aplicables a los Inputs
Input.prototype.getValue = function () {
    return this.container.value
}

Input.prototype.setValue = function (value) {
    this.container.value = value
}

Input.prototype.getType = function () {
    this.container.type
}

Input.prototype.setType = function (type) {
    this.container.type = type
}