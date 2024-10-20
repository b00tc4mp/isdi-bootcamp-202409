/**
 * 
 * @param {HTMLElement} container The DOM container of the Compo instance
 */

class Compo {
    constructor (container){
        this.children = []
        this.container = container
        this.parent = null
    }

    add(child){
        this.children.push(child)
        child.parent = this
        this.container.appendChild(child.container)
    }

    removeSelf() {
        const index = this.parent.children.findIndex(child => child === this);

        if (index > -1) 
            this.parent.children.splice(index, 1)

        this.container.remove()     
    }
    
    addBehavior(type, callback) {
        this.container.addEventListener(type, callback)
    }
}