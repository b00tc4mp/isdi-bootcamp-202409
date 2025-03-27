/**
 * Builds a Time instance
 * @param {string} text text inside the Time instance
 */
class Time extends Compo {
  constructor(text) {
    super(document.createElement('time'))
    this.container.innerText = text
  }

  setText(text) {
    this.container.innerText = text
  }
  getText() {
    return this.container.innerText
  }
}