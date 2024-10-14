
//Creamos funcion creadora de formularios 
function Form() {
    Compo.call(this, document.createElement("form"))
}

//Lo hacemos responder a Compo madre y damos condicion de constructora
Form.extends(Compo)

// Utilidades aplicables a los form
Form.prototype.reset = function () {
    this.container.reset()
}