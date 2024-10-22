


function UnorderedList() {
    Compo.call(this, document.createElement('ul'));
};

UnorderedList.extends(Compo);
//UnorderedList.prototype = Object.create(Compo.prototype);
//UnorderedList.prototype.constructor = UnorderedList;
