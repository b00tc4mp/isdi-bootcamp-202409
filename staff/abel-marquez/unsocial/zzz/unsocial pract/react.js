let loggedInUser = null 

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1',{style :{fontSize: '24px', color:'red', textAlign:'center'}},'Los 3 starters de 1 generación y sus counters')

const divtitle = React.createElement('div',{style :{backgroundColor: 'magenta', padding: '10px'}},title)


function Pokemonsection (img, countermessage) {
    const image = React.createElement('img',
        {style: {width : '80%', maxHeight: '350px', border: '2px solid black'},
        src: img,
        alt: 'Pokemon'}

    )

    const button = React.createElement('button',
        {type: 'button',
            style:{width: '20%', marginTop:'10px', },
            onClick: () => alert(countermessage),
        }, 'Ver su Counter 💀')

        return React.createElement('div', 
            {style: {display: 'flex', flexDirection: 'column', alignItems:'center', width:'100%'}},
            [image,button])
        
}


const squirtlesection = Pokemonsection('https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png', 'El counter de Squirtle es el tipo 🍃')

const charmandersection = Pokemonsection('https://cdn-images-1.medium.com/v2/resize:fit:424/1*Hxptm5gIRc3HyYXzw5nfpw.png', 'El counter de Charmander es el tipo 💧')

const bulbasursection = Pokemonsection('https://images.wikidexcdn.net/mwuploads/wikidex/thumb/4/43/latest/20190406170624/Bulbasaur.png/800px-Bulbasaur.png', 'El counter de Bulbasur es el tipo 🔥')


const pokemons = React.createElement('div',
    {style: {backgroundColor:'white', width: '100%',  padding: '20px', justifyContent: 'space-around', display: 'flex' }},
    [squirtlesection,charmandersection,bulbasursection]

)

const imgfooter = React.createElement('img',
    {style: {width: '90%', maxHeight:'500px',marginTop: '100px'},
    src: 'https://i.ytimg.com/vi/PDPHOlh_Pgw/maxresdefault.jpg'}
)



const footer = React.createElement('footer',
    {style: {width: '100%', display:'flex',justifyContent: 'center'}},
    [imgfooter]
)



root.render([
    divtitle,
    pokemons,
    footer
])