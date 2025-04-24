/**
 * Constructs Input Instances
 */
function Input(type, id) {
    Compo.call(this, document.createElement('input'))
    this.container.style.width = '100%'
    this.container.style.boxSizing = 'border-box'

    this.container.type = type
    this.container.id = id
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