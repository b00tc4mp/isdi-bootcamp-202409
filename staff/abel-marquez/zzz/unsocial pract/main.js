let loggedInUser = null 

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1',{style :{fontSize: '24px', color:'red', textAlign:'center'}},'Los 3 starters de 1 generación y sus counters')

const divtitle = React.createElement('div',{style :{backgroundColor: 'magenta', padding: '10px'}},title)

const squirtle = React.createElement('img', {style: {width : '25%', maxHeight: '350px', border: '2px solid black'},src :'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'})
const charmander = React.createElement('img', {style: {width : '25%', maxHeight: '350px', border: '2px solid black'},src :'https://cdn-images-1.medium.com/v2/resize:fit:424/1*Hxptm5gIRc3HyYXzw5nfpw.png'})
const bulbasur = React.createElement('img', {style: {width : '25%', maxHeight: '350px', border: '2px solid black'},src :'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/4/43/latest/20190406170624/Bulbasaur.png/800px-Bulbasaur.png'})

const pokemons = React.createElement('div',{style :{backgroundColor: 'white', width:'100%', padding: '20px', justifyContent: 'space-around' ,display: 'flex'}},[squirtle,charmander,bulbasur,ShowCounters])

function ShowCounters(props) {
    const button = React.createElement('button',
        {type: 'button',
            onClick: () => alert (`El counter de ${props.counter} és el 🍃`) ,
        style:{
            curor: 'pointer',
            border: '1px solid black'
        }

        },
    props.counter)
}





/*function CounterFunction(props) {
    const counterbutton = React.createElement('button',
        {type:'button',
            onClick: () => alert('Ver su counter')
                event.preventDefault()
    
                
            },
    
    
    
    }, 'Su Counter 💀')

}*/



root.render([
    divtitle,
    pokemons],
ShowCounters({ counter: '💧'}))
