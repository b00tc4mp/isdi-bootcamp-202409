/**
 * 
 */
class Image extends Compo {
    constructor(address) {
    super(this, document.createElement('img'))

    this.container.src = address
    this.container.style.width = '100%'
}
}
