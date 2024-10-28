/**
 * Builds a Code instance
 * @param {string} text text inside the Code instance
 */
class Code extends Compo {
  constructor(text) {
    super(document.createElement('code'))
    this.container.innerText = text
  }

  setText(text) {
    this.container.innerText = text
  }
  getText() {
    return this.container.innerText
  }
}