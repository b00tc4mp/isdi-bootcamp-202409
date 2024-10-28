/**
 * 
 * @param {*} text 
 */
class Preformatted extends Compo{
    constructor(text){
    super(document.createElement('pre'))

    this.container.innerText = text
}

setText = function (text) {
    this.container.innerText = text
}

getText = function () {
    return this.container.innerText
}

}