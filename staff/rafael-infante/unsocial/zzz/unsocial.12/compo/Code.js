/**
 * Builds a Code instance
 * @param {string} text text inside the Code instance
 */
function Code(text) {
  Compo.call(this, document.createElement('code'))
  this.container.innerText = text
}
Code.extends(Compo)

Code.prototype.setText = function (text) {
  this.container.innerText = text
}
Code.prototype.getText = function () {
  return this.container.innerText
}