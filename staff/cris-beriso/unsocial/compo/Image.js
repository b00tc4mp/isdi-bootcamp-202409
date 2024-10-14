/**
 * 
 */
function Image(address) {
  Compo.call(this, document.createElement('img'))

  this.container.src = address
  this.container.style.width = '100%'
}

Image.extends(Compo)