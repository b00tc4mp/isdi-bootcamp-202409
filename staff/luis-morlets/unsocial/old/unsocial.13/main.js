let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1', { style: { background: 'peru', textAlign: 'center', alignSelf: 'center' } }, 'Its time to to to REACT!!')

const image = React.createElement('img', {
    id: 'img1',
    src: 'https://somoskudasai.com/wp-content/uploads/2020/06/portada_yami-yugi.jpg',
    alt: 'Yami Yugi from YuGiOh!',
    style: {
        height: '400px', alignSelf: 'center', display: 'block'
    }
})

let isFirstImage = true

const button = React.createElement('button', {
    type: 'button', onClick: () => {
        alert('EXODIAAAAAAAA');
        document.body.style.backgroundImage = 'url(https://images7.alphacoders.com/129/1290499.png)';
        showImage();
        playVideo();
        // if (isFirstImage) {
        //     vid.src = 'https://i.redd.it/drpcza8lb61c1.jpeg'
        // } else {
        //     vid.src = 'https://s1.zerochan.net/Kaiba.Seto.600.2970912.jpg'
        // }
        // isFirstImage = !isFirstImage
    },
    style: {
        alignSelf: 'center'
    }
},
    'Click if you believe in the heart of the cards')

const video = React.createElement('video', {
    id: 'vid',
    src: 'https://media.tenor.com/AdaSVzqCxLIAAAPo/yugioh-anime.mp4',
    type: 'video/mp4',
    loop: 'true',
    style: {
        height: '400px',
        alignSelf: 'center',
        display: 'none'
    }
})

function showImage() {
    document.getElementById('vid').style.display = 'block';
    //document.getElementById('img1').style.display = 'none';
}

function playVideo() {
    document.getElementById('vid').play()
}

const colors = [
    'red',
    'blue',
    'green',
    'pink',
    'black',
]

const randomColor = React.createElement('button', {
    onClick: () => {
        const randomizer = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomizer
    },
    style: {
        alignSelf: 'center'
    }
}, 'Click to change background'
)

function ReactiveEmoji(props) {
    const content = React.createElement('span', {
        onClick: () => alert(`${props.emoji} Exodia's head!`),
        style: {
            cursor: 'pointer'
        }
    },
        props.emoji)

    const box = React.createElement('div', {
        style: {
            border: '2px solid black',
            display: 'flex',
            padding: '3px',
            width: '22px',
            alignSelf: 'center'
        }
    },
        content)

    return box
}

const { Component } = React
class Card extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const content = React.createElement('span', { style: { padding: '2px', display: 'flex', justifyContent: 'center', flexDirection: 'row' } }, this.props.card)

        return content
    }
}

const leftArm = new Card({ card: '💪' })
const rightArm = new Card({ card: '💪' })
const leftLeg = new Card({ card: '🦵' })
const rightLeg = new Card({ card: '🦵' })

root.render([
    title,
    image,
    leftArm.render(),
    leftLeg.render(),
    ReactiveEmoji({ emoji: '🃏' }),
    rightArm.render(),
    rightLeg.render(),
    button,
    video,
    randomColor,
])