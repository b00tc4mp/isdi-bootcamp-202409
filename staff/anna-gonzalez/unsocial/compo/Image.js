class Image extends Compo {
    constructor(address) {

        super(document.createElement('img'))

        this.container.src = address
        this.container.style.width = '400px'
        this.container.style.border = '2px solid yellow'
        this.container.style.borderRadius = '10px'
    }
}