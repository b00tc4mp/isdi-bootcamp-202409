/**
 * Builds Header instances
 * @param {string} className Name the CSS class of the Header instance
 */
function Header(className) {
  Compo.call(this, document.createElement('header'))
  this.container.classList.add(className)
}
Header.extends(Compo)