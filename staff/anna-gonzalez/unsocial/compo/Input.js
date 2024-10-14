function Input(type, id) {
    Compo.call(this, document.createElement('input'))

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