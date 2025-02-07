/**
 * Builds a Form instance
 * @param {string} className Name the CSS class of the Form instance
 */
class Form extends Compo {
  constructor(className) {
    super(document.createElement('form'))
    this.container.classList.add(className)
  }

  reset() {
    this.container.reset()
  }
}