/**
 * Builds a Preformatted instance
 * @param {string} text text inside the Preformatted instance
 */
class Preformatted extends Compo {
  constructor(text) {
    super(document.createElement('pre'))
    this.container.innerText = text
  }

  setText(text) {
    this.container.innerText = text
  }
  getText() {
    return this.container.innerText
  }
}