


function Link(text) {
    Compo.call(this, document.createElement('a'));

    this.container.innerText = text;
    this.container.href = '';
}

Link.extends(Compo);

//Link.prototype = Object.create(Compo.prototype);
//Link.prototype.constructor = Link;
