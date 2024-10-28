/**
 * Builds a Picture instance
 * @param {string} imageSrc directory/path of the image
 * @param {string} imageClass Name the CSS class of the Picture instance
 */
function Picture(imageSrc, imageClass) {
  Compo.call(this, document.createElement('img'))
  this.container.src = imageSrc
  this.container.classList.add(imageClass)
}
Picture.extends(Compo)