



function Time(text) {
    Compo.call(this, document.createElement('time'));

    this.container.innerText = text;
};

Time.extends(Compo);
//Time.prototype = Object.create(Compo.prototype);
//Time.prototype.constructor = Time;

Time.prototype.setText = function (text) {
    this.container.innerText = text;
}

Time.prototype.getText = function () {
    return this.container.innerText;
}