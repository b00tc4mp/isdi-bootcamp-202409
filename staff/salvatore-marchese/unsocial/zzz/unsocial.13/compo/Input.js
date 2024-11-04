/**
 * Constructs Input instances
 * 
 * @param {string} type The input type
 * @param {string} id The input id
 */
class Input extends Compo {
    constructor(type, id, placeholder) {
    super(document.createElement('input'))
    this.container.style.width = '100%'
    this.container.style.boxSizing = 'border-box'

    this.container.type = type
    this.container.id = id
    this.container.placeholder = placeholder
    }


    getValue() {
    return this.container.value
    }

    setValue() {
    this.container.value = value
    }

    getType() {
    return this.container.type
    }

    setType(type) {
    this.container.type = type
    }

    getPlaceholder() {
        return this.container.placeholder
    }

    setPlaceholder() {
        this.container.placeholder = placeholder
    }
}