/**
 * Function que construye Input de cada formulario
 * @param {string} type 
 * @param {string} id 
 */
class Input extends Compo {
    constructor(type, id) {
        super(document.createElement('input'))

        this.container.type = type
        this.container.id = id
    }
    getValue() {
        return this.container.value
    }
    setValue(value) {
        this.container.value = value
    }
}