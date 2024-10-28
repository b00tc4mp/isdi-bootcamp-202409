//creación de función constructora para hacer todo apartir de ella. 
//todos los elementos que creemos como 'new compo' aplican sus propiedades, es decir heredan ser de propiedad array y container.(container sirve para añadir elementos)

class Compo {
    constructor(container) {
        this.children = []
        this.container = container
    }

    add(child) {
        this.children.push(child)
        child.parent = this
        this.container.appendChild(child.container)
    }

    remove() {
        const index = this.parent.children.findIndex(child => child === this)

        if (index > -1) {
            this.parent.children.splice(index, 1)
        }
        this.container.remove()
    }

    addBehavior(type, callback) {
        this.container.addEventListener(type, callback)
    }
}