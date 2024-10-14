/**
 * Constructs Input instances
 * 
 * @param {string} type The input type
 * @param {string} id The input id
 */
function Input(id, type) {
    Compo.call(this, document.createElement('input'))
    this.container.id = id
    this.container.type = type
}

Input.extends(Compo)

Input.prototype.getValue = function () {
    return this.container.value
}

Input.prototype.setValue = function (value) {
    this.container.value = value
}

Input.prototype.getType = function () {
    return this.container.type
}

Input.prototype.setType = function (type) {
    this.container.type = type
}