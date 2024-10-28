class Heading extends Compo {
    constructor(text, level) {

        super(document.createElement('h' + level))

        this.container.innerText = text
    }
}