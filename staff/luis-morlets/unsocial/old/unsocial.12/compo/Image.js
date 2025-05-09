/**
 * Construct image instances
 */
class Image extends Compo {
    constructor(address) {
        super(document.createElement('img'))

        this.container.src = address
        this.container.style.width = '100%'
    }
}