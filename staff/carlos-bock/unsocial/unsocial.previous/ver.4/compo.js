function Compo(container) {
    this.children = [];
    this.container = container;
}

Compo.prototype.add = function (child) {
    this.children.push(child);
    this.container.appendChild(child.container);
}