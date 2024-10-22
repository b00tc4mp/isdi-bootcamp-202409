


function Image(address) {
    Compo.call(this,document.createElement('img'));

    this.container.scr = address;
    this.container.style.width = '100%';
}

Image.extends(Compo);

//Image.prototype = Object.create(Compo.prototype);
//Image.prototype.constructor = Image;