/**vBuild Label part
 * 
 */

class Label extends Compo {
    constructor(text, id) {
        super(document.createElement('label'))

        this.container.innerText = text
        this.container.htmlFor = id
    }
}

