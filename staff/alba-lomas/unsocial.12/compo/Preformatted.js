


/**
 * 
 * @param {*} text 
 */
function Preformatted(text) {
    Compo.call(this, document.createElement('pre'))

    this.container.innerText = text
}

Preformatted.extends(Compo)

Preformatted.prototype.setText = function (text) {
    this.container.innerText = text
}

Preformatted.prototype.getText = function () {
    return this.container.innerText
}