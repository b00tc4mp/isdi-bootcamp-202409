
//Creamos funcion creadora de formularios 
class Form extends Compo {
    constructor() {
        super(document.createElement("form"))
    }
    // Utilidades aplicables a los form
    reset() {
        this.container.reset()
    }
}
