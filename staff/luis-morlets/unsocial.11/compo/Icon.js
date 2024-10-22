/**
 * Construct Icon instances
 * 
 * @param {string} text The text inside span
 */
function Icon(address) {
    Compo.call(this, document.createElement('img'))

    this.container.src = address
}

Icon.extends(Compo)

Icon.prototype.setAddress = function (address) {
    this.container.src = address
}

Icon.prototype.getAddress = function () {
    return this.container.src
}