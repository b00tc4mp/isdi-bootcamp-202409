// párrafo/texto del post

class Paragraph extends Compo { //creamos paragraph
    constructor(text) {
        super(document.createElement('p'));

        this.container.innerText = text //tipo de info que aparece en parrafo, texto
    }
    setText(text) { //texto que puede ser modificado
        this.container.innerText = text;
    }
    getText() { //dime que esta dentor de mi parrafo
        return this.container.innerText;
    }
}