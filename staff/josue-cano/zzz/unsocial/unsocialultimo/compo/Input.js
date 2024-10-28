/**
 * Constructs Input instances
 * 
 * @param {string} type The input type
 * @param {string} id The input id
 */
class Input extends Compo {
    constructor(type, id) {
    super(this, document.createElement('input'))
    this.container.style.width = '100%'
    this.container.style.boxSizing = 'border-box'

    this.container.type = type
    this.container.id = id
}


getValue = function () {
    return this.container.value
}

setValue = function (value) {
    this.container.value = value
}

getType = function () {
    return this.container.type
}

setType = function (type) {
    this.container.type = type
}
}