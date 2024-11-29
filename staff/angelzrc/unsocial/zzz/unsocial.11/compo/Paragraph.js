/* function Paragraph(text) {
    Compo.call(this, document.createElement('p'))

    this.container.innerText = text
}

Paragraph.extends(Compo)

Paragraph.prototype.setText = function (text) {
    thbis.container.innerText = text
}

Paragraph.prototype.getText = function() {
    return this.container.innerText
} */

    class Paragraph extends Compo{
        constructor(text) {
            super(document.createElement('p'))

            this.container.innerText= text
            
        }

        setText(text){
            this.container.innerText = text
        }

        getText() {
            return this.container.innerText
        }
    }

    