/**
 * Constructs Form 'instances'/parts
 */

class Form extends Compo {
    constructor() {
        super(document.createElement('form'))
    }
    reset() {
        this.container.reset()
    }
}