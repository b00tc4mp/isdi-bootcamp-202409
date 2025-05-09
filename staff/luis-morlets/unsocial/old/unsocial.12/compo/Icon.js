/**
 * Construct Icon instances
 * 
 * @param {string} text The text inside span
 */
class Icon extends Compo {
    constructor(address) {
        super(document.createElement('img'))

        this.container.src = address
    }

    setAddress(address) {
        this.container.src = address
    }

    getAddress() {
        return this.container.src
    }
}