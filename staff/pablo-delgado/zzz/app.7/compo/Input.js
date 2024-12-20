/**
 * Build Input part
 */

class Input extends Compo {
    constructor(type, id) {
        super(document.createElement('input'))

        this.container.style.width = '100%'
        this.container.boxSizing = 'border-box'

        this.container.type = type
        this.container.id = id
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