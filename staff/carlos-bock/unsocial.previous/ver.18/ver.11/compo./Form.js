function Form() {
    Compo.call(this, document.createElement('form'));
};

//removed
//Form.prototype = Object.create(Compo.prototype);
//Form.prototype.constructor = Form;// documentation


Form.extends(Compo);

/*
function Form() {
    Compo.call(this, document.createElement('form'));
}*/

Form.prototype.reset = function () {
    this.container.rest();
};

//removed
//Form.prototype = Object.create(Compo.prototype);
//Form.prototype.constructor = Form;