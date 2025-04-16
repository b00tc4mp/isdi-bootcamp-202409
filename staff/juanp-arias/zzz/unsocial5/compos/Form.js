/**
 * Constructora que crea formularios
 */
class Form extends Compo {
    constructor() {
        super(document.createElement('form'))//Llama la constructora COMPO para que actúe sobre Form
    }
    reset () {
        this.container.reset()
    }
}
