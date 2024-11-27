/**
 * Constructs Form instances
 */

class form extends Compo {
    constructor () {
    super (document.createElement('form'))

    }
    
reset () {
    this.container.reset()
}
    }