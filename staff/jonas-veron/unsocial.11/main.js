let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1', { style: {backgroundColor: 'red' } }, 'TRES EN RAYA' )

// const button = React.createElement('button', { type: 'button', onClick: () => alert('Clicked!') }, 'Click me!')


// const messiImage = React.createElement('img', {src:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ84y5_lkS-H9tv1O4xHAcyCYlHO11Mu4-9TjMEHc8_nHFOIZy1jMaTAEVTJRmuxWO-JOQg8kTjSYLBlQ4SoeB0u3QKLW4yxHfGgHkGEF4' ,alt: 'Imagen', style:{ margin:'auto'}})

// const colors = [
//     'blue',
//     'black',
//     'white',
//     'red',
//     'yellow'
// ]

// const division = React.createElement('div', {id: 'colorin', onClick: () => {
//     const randomColor = colors[Math.floor(Math.random() * colors.length)]
//     document.getElementById('colorin').style.backgroundColor = randomColor
    
// }, style: { backgroundColor: 'black', height: '500px', width: '500px', margin: 'auto'}}, '')

const division1 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px', width: '160px', margin: 'auto'} }, '')

const division2 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const division3 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const division4 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const division5 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const division6 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const division7 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const division8 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const division9 = React.createElement('div', {style: {backgroundColor: 'white', height: '160px  ', width: '160px  ', margin: 'auto'} }, '')

const plataforma = React.createElement('div', {style: {backgroundColor: 'black', height: '500px', width: '500px', margin: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', padding:'5px' } }, [division1, division2, division3, division4, division5, division6, division7, division8, division9 ])



root.render([
    title,
    plataforma,
    // button,
    // messiImage,
    // division
])