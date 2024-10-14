//Creamos funcion creadora de labels
function Label(text, id) {
    Compo.call(this, document.createElement("label"))
    this.container.innerText = text
    this.container.htmlFor = id

}
//Lo hacemos responder a Compo madre y damos condicion de constructora
Label.extends(Compo)