/**
 * Construct item list instances
 */
class ListItem extends Compo {
    constructor() {
        super(document.createElement('li'))

        this.container.style.listStyleType = 'none'
    }
}