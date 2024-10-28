//Creamos funcion creadora de inputs
class Input extends Compo {
    constructor(type, id) {
        super(document.createElement("input"))

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
        this.container.type
    }

    setType(type) {
        this.container.type = type
    }
}