// add documentation 


function Button(text, type) {
    Compo.call(this, document.createElement('button'));

    this.container.innerText = text;
    this.container.type = type;
}

Button.extends(Compo); //code added version 11;