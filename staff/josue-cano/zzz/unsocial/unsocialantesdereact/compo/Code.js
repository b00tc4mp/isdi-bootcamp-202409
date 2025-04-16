/**
 * 
 * @param {*} text 
 */
class Code extends Compo {
    constructor(text) {
        super(document.createElement('code'))

        this.container.innerText = text
    }



    setText = function (text) {
        this.container.innerText = text
    }

    getText = function () {
        return this.container.innerText
    }
}