/**
 * 
 */
function ListItem() {
    Compo.call(this, document.createElement('li'))
}

ListItem.prototype = Object.create(Compo.prototype)
ListItem.prototype.constructor = ListItem