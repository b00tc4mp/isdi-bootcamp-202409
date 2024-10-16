let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const logo = React.createElement('img', { src: 'https://tienda.aitanamusic.es/cdn/shop/files/logoalpha_manual_white_3594x.png?v=1680011620', alt: 'Descripción imagen', style: { height: '25px', width: '25px' } }, null)
const logoSection = React.createElement('section', null, logo)
const title = React.createElement('h1', null, 'αitana')

const showsLink = React.createElement('a', {
    href: '',
    onClick: event => {
        event.preventDefault()

        console.log('link to shows')
    }
}, 'shows')

const storeLink = React.createElement('a', {
    href: '',
    onClick: event => {
        event.preventDefault()

        console.log('link to store')
    }
}, 'store')

const formTitle = React.createElement('h2', null, 'subscribe to our newsletter↓')
const nameLabel = React.createElement('label', { for: 'name' }, 'name')
const nameInput = React.createElement('input', { type: 'text', id: 'name', placeholder: 'example: Anna' })
const emailLabel = React.createElement('label', { for: 'email' }, 'email')
const emailInput = React.createElement('input', { type: 'email', id: 'email', placeholder: 'example: anna@gmail.com' })
const birthdayLabel = React.createElement('label', { for: 'birthday' }, 'birthday')
const birthdayInput = React.createElement('input', { type: 'month', id: 'birthday', placeholder: 'birthday' })
const submitForm = React.createElement('button', { type: 'submit' }, 'send')
const form = React.createElement('form', {
    onSubmit: event => {
        event.preventDefault()

        const videoUrl = "https://www.youtube.com/watch?v=zoJMg7yeyFw&pp=ygUVcG9sZW1pY28gYmFpbGUgYWl0YW5h"
        window.open(videoUrl, '_blank')
    }
}, [formTitle, nameLabel, nameInput, emailLabel, emailInput, birthdayLabel, birthdayInput, submitForm])

root.render([
    logoSection,
    title,
    showsLink,
    storeLink,
    form,
])