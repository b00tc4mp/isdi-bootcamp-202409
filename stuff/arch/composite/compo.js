function Compo(container) {
    this.container = container
    this.children = []
}

Compo.prototype.add = function (child) {
    this.children.push(child)
    this.container.appendChild(child.container)
}

var colors = new Compo(document.createElement('ul'))

var red = new Compo(document.createElement('li'))
var redImage = document.createElement('img')
redImage.src = 'https://lumiere-a.akamaihd.net/v1/images/image_53a52f8d.jpeg?region=0,0,540,810'
red.container.appendChild(redImage)

var green = new Compo(document.createElement('li'))
var greenImage = document.createElement('img')
greenImage.src = 'https://seattlerefined.com/resources/media/54fb05fa-0018-4f85-b1a4-b0565f19109a-full36x25_drseussthegrinchGRC_Tsr1Sheet_GrinchAndMax_RGB_1_rgb.jpg?1541794979383'
green.container.appendChild(greenImage)

var blue = new Compo(document.createElement('li'))
var blueImage = document.createElement('img')
blueImage.src = 'https://i.pinimg.com/736x/17/78/49/1778499e560cfd912aa32e565f407e30.jpg'
blue.container.appendChild(blueImage)

var pink = new Compo(document.createElement('li'))
var pinkImage = document.createElement('img')
pinkImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Patrick_Star.jpg/320px-Patrick_Star.jpg'
pink.container.appendChild(pinkImage)

colors.add(red)
colors.add(green)
colors.add(blue)
colors.add(pink)

console.log(colors)

var page = new Compo(document.body)

page.add(colors)

