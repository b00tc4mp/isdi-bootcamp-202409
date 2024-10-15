/**
 * Builds Header instances
 * @param {string} className Name the CSS class of the Header instance
 */
class Header extends Compo {
  constructor(className) {
    super(document.createElement('header'))
    this.container.classList.add(className)
  }
}