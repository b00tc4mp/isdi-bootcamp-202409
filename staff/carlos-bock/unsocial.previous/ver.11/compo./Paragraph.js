

function Paragraph(text) {
    Compo.call(this, document.createElement('p'));

    this.container.innerText = text;
}

Paragraph.extends(Compo);

//Paragraph.prototype = Object.create(Compo.prototype);
//Paragraph.prototype.constructor = Paragraph; 

Paragraph.prototype.setText = function (text) {
    this.container.innerText = text;
};

Paragraph.prototype.getText = function () {
    return this.container.innerText;
};