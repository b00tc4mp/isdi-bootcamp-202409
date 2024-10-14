/**
 * Construct unordered lists instances
 */
function UnorderedList() {
    Compo.call(this, document.createElement('ul'))
}

UnorderedList.extends(Compo)