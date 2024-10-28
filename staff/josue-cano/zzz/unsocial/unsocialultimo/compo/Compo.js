/**
 * Constructs Compo instances
 * 
 * @param {HTMLElement} container The DOM container of the Compo instance
 */
class Compo {
    constructor(container) {
        this.children = []
        this.container = container
        this.parent = null
    }

    add = function (child) {
        this.children.push(child)
        child.parent = this

        this.container.appendChild(child.container)
    }

    removeSelf = function () {
        const index = this.parent.children.findIndex(function (child) {
            return child === this
        }.bind(this))

        if (index > -1)
            this.parent.children.splice(index, 1)

        this.container.remove()
    }

    addBehavior = function (type, callback) {
        this.container.addEventListener(type, callback)

    }
}
