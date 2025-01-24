


function Compo(container) { // Creamos la funcion de composite, creando containers.
    this.container = container // container tiene un container (componente estructural: h3, div, p,...)
    this.children = [] // el container tiene otros componentes hijos.
}

Compo.prototype.add = function (child) { // añadimos al prototipo compo un hijo.
    this.children.push(child) // le añadimos hijos a los hijos.
    this.container.appendChild(child.container) // le añadimos containers hijos a los containers.
}




var colors = new Compo(document.createElement('ul')) // la variable colors tiene un componente (elemento contenedor) ul.

var red = new Compo(document.createElement('li')) // la variable red tiene un componente (elemento contenedor) li.
var redImage = document.createElement('img') // Creamos la variable redImage y le decimos que es tipo imagen (contenedor).
redImage.src = 'https://static.toiimg.com/thumb/msid-109652229,width-1280,height-720,resizemode-4/109652229.jpg' // contenido.
red.container.appendChild(redImage) // metemos la imagen dentro de la variable red (contenedor).Se pone con append.Child porque es un elemento html, no es un componente.

var blue = new Compo(document.createElement('li'))
var blueImage = document.createElement('img')
blueImage.src = 'https://plus.unsplash.com/premium_photo-1670271544153-dd9933f0f119?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ymx1ZSUyMGJhY2tncm91bmQlMjB0ZXh0dXJlfGVufDB8fDB8fHww'
red.container.appendChild(blueImage)

var green = new Compo(document.createElement('li'))
var green = new Compo(document.createElement('li'))
var greenImage = document.createElement('img')
greenImage.src = 'https://master-7rqtwti-znj23gdadsstc.piximizer.px.at/w_645,h_430,q_80,f_cover,cx_1,cy_0,cw_2994,ch_1996,v_86b8a07754/fileadmin/amc.info/6-Blog/en-gb/Article_17_Green_Food_Header.jpg'
red.container.appendChild(greenImage)

var pink = new Compo(document.createElement('li'))
var pink = new Compo(document.createElement('li'))
var pinkImage = document.createElement('img')
pinkImage.src = 'https://st4.depositphotos.com/13349494/26679/i/450/depositphotos_266791580-stock-photo-close-view-pink-paint-splash.jpg'
red.container.appendChild(pinkImage)




colors.add(red) /* Añadimos todos los colores a la variable colors. */
colors.add(blue)
colors.add(green)
colors.add(pink)

console.log(colors) // llamamos a la variable colors.

var page = new Compo(document.body) // creamos la variable page poniendole el body.

page.add(colors) // Añadimos colors a page.

/*- Page:
    - colors:
        - red
            - imagen
        - blue 
            - imagen
        - green
            - imagen
        - pink
            - imagen */


