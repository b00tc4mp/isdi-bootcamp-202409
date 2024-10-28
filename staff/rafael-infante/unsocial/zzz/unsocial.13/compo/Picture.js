/**
 * Builds a Picture instance
 * @param {string} imageSrc directory/path of the image
 * @param {string} imageClass Name the CSS class of the Picture instance
 */
class Picture extends Compo {
  constructor(imageSrc, imageClass) {
    super(document.createElement('img'))
    this.container.src = imageSrc
    this.container.classList.add(imageClass)
  }
}