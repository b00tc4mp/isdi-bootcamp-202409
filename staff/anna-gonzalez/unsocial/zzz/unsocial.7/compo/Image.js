function Image(address) {
    Compo.call(this, document.createElement('img'))

    this.container.src = address
    this.container.style.width = '400px'
    this.container.style.border = '2px solid yellow'
    this.container.style.borderRadius = '10px'
}

Image.extends(Compo)