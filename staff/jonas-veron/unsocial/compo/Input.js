/**
 * 
 * @param {string} type The input type
 * @param {string} id The input id
 */

class Input extends Compo {
    constructor (type, id) {
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

    getType(){
        return this.container.type //para cambiar el tipo de input
    }

    setType(type) {
        this.container.type = type //para cambiar el tipo de input
    }
}