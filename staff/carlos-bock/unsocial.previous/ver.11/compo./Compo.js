

//documentation 

function Compo(container) {
    this.children = [];
    this.container = container;
    this.parent = null; 
}


Compo.prototype.add = function (child) {
    this.children.push(child);
    child.parent =this; //this.container.appendChild(child.container);

    this.container.appendChild(child.container);
}

Compo.prototype.removeSelf = function () {
    var index = this.parent.children.findIndex(function (child) {
        return child === this;
    }.bind(this));

    if (index > -1)
        this.parent.children.splice(index, 1);

    this.container.remove();
    // disabel this line // this.container.remove();
}

Compo.prototype.addBehavior = function (type, callback) {
    this.container.addEventListener(type, callback);
}