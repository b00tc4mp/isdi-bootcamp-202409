//Creamos funcion creadora de botones
class Button extends Compo {
    constructor(text, type) {
        super(document.createElement("button"))

        this.container.innerText = text
        this.container.type = type
    }
    //Lo hacemos responder a Compo madre y damos condicion de constructora

    setText(text) {
        this.container.innerText = text
    }

    getText() {
        return this.container.innerText
    }
}
