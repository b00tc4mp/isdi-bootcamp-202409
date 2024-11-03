//creación de función constructora para hacer todo apartir de ella. 
//todos los elementos que creemos como 'new compo' aplican sus propiedades, es decir heredan ser de propiedad array y container.(container sirve para añadir elementos)


function Compo(container){
    this.children = []
    this.container = container
}

Compo.prototype.add = function (child){
    this.children.push(child)//Esto significa que todas las propiedades de tipo Compo, tienen esta función push. añaden elementos
    this.container.appendChild(child.container)//y añaden containers de sus childrens
}