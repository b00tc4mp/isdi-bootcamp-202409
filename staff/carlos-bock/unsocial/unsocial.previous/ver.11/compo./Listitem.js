



function ListItem() {
    Compo.call(this, document.createElement('li'));
};

ListItem.extends(Compo);
//ListItem.prototype = Object.create(Compo.prototype);
//ListItem.prototype.constructor = ListItem;