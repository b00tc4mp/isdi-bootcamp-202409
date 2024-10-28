function Button(text, type) {
    Compo.call(this, document.createElement('button'))

    this.container.innerText = text
    this.container.type = type
}

Button.extends(Compo)

Button.prototype.getText = function () {
    return this.container.textContent
};

Button.prototype.setText = function (text) {
    this.container.textContent = text
};