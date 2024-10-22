


// add documenttation

function Label(text, id) {
    Compo.call(this, document.createElement('label'));

    this.container.innerText = text;
    this.container.htmlFor = id;
}

Label.extends(Compo);

//Label.prototype = Object.create(Compo.prototype);
//Label.prototype.constructor = Label;