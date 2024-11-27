Function.prototype.extends = function (from) {
    this.prototype = Object.create(from.prototype)
    this.prototype.constructor = this
}