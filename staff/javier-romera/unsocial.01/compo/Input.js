/**
 * Constructs Input instances
 * 
 * @param {string} type The input type
 * @param {string} id The input id
 */
class Input extends Compo {
    constructor(id, type) {
        super(document.createElement('input'))
        // this.container.style.width = '100%'
        // this.container.style.boxSizing = 'border-box'

        this.container.id = id
        this.container.type = type
    }

    getValue() {
        return this.container.value
    }

    setValue(value) {
        this.container.value = value
    }

    getType() {
        return this.container.type
    }

    setType(type) {
        this.container.type = type
    }
}