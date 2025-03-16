const canvas = document.querySelector('canvas')

//RENDER DE TODO LO QUE VA A CONTENER EL CANVAS
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 90) {
    collisionsMap.push(collisions.slice(i, 90 + i))
}

//REDNDER DE LAS COLISIONES
class Boundary {
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//COLISIONES (CUADRADITOS LIMITE)
const boundaries = []
collisionsMap.forEach(row => flex)

//BACKGROUND IMAGE (MAP)
const image = new Image()
image.src = '../dat/sprites/final_map.png'

const playerImage = new Image()
playerImage.src = '../dat/sprites/player/p_down.png'


class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -4400,
        y: -2350
    },
    image: image //variable que creamos y pasamos al constructor
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate) //bucle infinito de esta función una vez la llamo 
    background.draw()
    c.drawImage(
        playerImage,
        0,                          //empiezo a cortar el spritesheet desde la esquina superior izquierda
        0,
        playerImage.width / 4,  //corto el spritesheet entre 4 (muestro el primero de todos)
        playerImage.height,       //corto toda la altura del sheet 
        canvas.width / 2 - (playerImage.width / 4) / 2, //se centra la imagen cortada respecto al canvas
        canvas.height / 2 - playerImage.height / 2,  //SE CENTRA EL SPRITESHEET DEL PSJ EN RELACIÓN AL CANVAS PARA CENTRARLO
        playerImage.width / 4,
        playerImage.height,
    )

    if (keys.w.pressed && lastkey === 'w') background.position.y += 2
    else if (keys.a.pressed && lastkey === 'a') background.position.x += 2
    else if (keys.s.pressed && lastkey === 's') background.position.y -= 2
    else if (keys.d.pressed && lastkey === 'd') background.position.x -= 2
}
animate()

let lastkey = '' //variable que va a tener en cuenta la ultima tecla presionada para cambiar hacia ese movimiento 
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})
