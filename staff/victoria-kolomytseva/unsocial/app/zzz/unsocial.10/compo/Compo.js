/**
 * Constructs Compo instances
 * 
 * @param {HTMLElement} container The DOM container of the Compo instance
 */
class Compo {
    constructor(container) {
        console.log('compo container: ', container)
        this.children = []
        this.container = container
        this.parent = null
    }
    // Método para agregar un hijo
    add(child) {
        this.children.push(child)
        child.parent = this
        this.container.appendChild(child.container)
    }
    // Método para eliminarse a sí mismo
    removeSelf() {
        const index = this.parent.children.findIndex(child => child === this)

        if (index > -1)
            this.parent.children.splice(index, 1)
        this.container.remove()
    }
    // Método para agregar un evento a este componente
    addBehavior(type, callback) {
        this.container.addEventListener(type, callback)
    }
}