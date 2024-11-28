//Funcion constructora para el parrafo de la foto
class Paragraph extends Compo {
    constructor(text) {
        super(document.createElement('p'))
        this.container.innerText = text
    }

    setText(text) {
        this.container.innerText = text
    }

    getText() {
        return this.container.innerText
    }

}