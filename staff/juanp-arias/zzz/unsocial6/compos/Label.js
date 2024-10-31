/**
 * Function que construye el Label de cada formulario creado.
 * @param {string} text 
 * @param {string} id 
 */
class Label extends Compo {
    constructor(text, id) {
        super(document.createElement('label'))

        this.container.innerText = text //Declaramos que todo lo que sea creado como Label, contiene un texto y un id.
        this.container.htmlFor = id
    }
}