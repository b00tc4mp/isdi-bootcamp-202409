/**
 * 
 * @param {*} text 
 */
function Time(text) {
    Compo.call(this, document.createElement('time'))

    this.container.innerText = text
}

Time.extends(Compo)

Time.prototype.setText = function (text) {
    this.container.innerText = text
}

Time.prototype.getText = function () {
    return this.container.innerText
}