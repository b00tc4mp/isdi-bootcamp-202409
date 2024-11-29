const canvas = document.querySelector('canvas')

//variable que me va a permitir dibujar cualquier mierda en la api
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

//IMAGEN DE FONDO
const backgroundImage = new Image()
backgroundImage.src = './dat/test_map.png'
console.log(backgroundImage)


const playerImage = new Image()
playerImage.src = './dat/player/p_down.png'


//renderizar la imagen en pantalla
backgroundImage.onload = () => {
    c.drawImage(backgroundImage, 0, -300)
    c.drawImage(
        playerImage,
        0,                          //Como playerImage es un tileset de 4 partes se procede a recortar el mismo
        0,                          // se recorta desde la esquina superior izquierda
        playerImage.width / 4,      // la imagen que utilizará por tanto es la de la izquierda
        playerImage.height,         // se utiliza la altura completa del tileset
        canvas.width / 2 - playerImage.width / 4 / 2, //se calcula la posición recortada para centrar el ancho en el punto exacto la imagen
        canvas.height / 2 - playerImage.height / 2,   //se centra la altura también
        playerImage.width / 4,
        playerImage.height                            //escala la porcion recortada para conservar su tamaño original en el recorte
    )
}

function animationLoop() {
    window.requestAnimationFrame(animationLoop) //animamos constantemente con este loop
}

// //evento para el movimiento
window.addEventListener('keydown', (k) => {
    switch (k.key) {
        case 'w':
            console.log('key')
            break

        case 'a':
            console.log('key')
            break

        case 's':
            console.log('key')
            break

        case 'd':
            console.log('key')
            break
    }
})
