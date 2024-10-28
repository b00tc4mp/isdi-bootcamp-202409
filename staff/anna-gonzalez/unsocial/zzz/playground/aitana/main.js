let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

// const _jsx = React.createElement
// const Component = React.Component
const { createElement: _jsx, Component } = React

const logo = _jsx('img', { src: 'https://tienda.aitanamusic.es/cdn/shop/files/logoalpha_manual_white_3594x.png?v=1680011620', alt: 'Descripción imagen', style: { height: '25px', width: '25px' } }, null)
const logoSection = _jsx('section', null, logo)
const title = _jsx('h1', null, 'αitana')

const showsLink = _jsx('a', {
    href: '',
    onClick: event => {
        event.preventDefault()

        console.log('link to shows')
    }
}, 'shows')

const storeLink = _jsx('a', {
    href: '',
    onClick: event => {
        event.preventDefault()

        console.log('link to store')
    }
}, 'store')

const formTitle = _jsx('h2', null, 'subscribe to our newsletter↓')
const nameLabel = _jsx('label', { for: 'name' }, 'name')
const nameInput = _jsx('input', { type: 'text', id: 'name', placeholder: 'example: Anna' })
const emailLabel = _jsx('label', { for: 'email' }, 'email')
const emailInput = _jsx('input', { type: 'email', id: 'email', placeholder: 'example: anna@gmail.com' })
const birthdayLabel = _jsx('label', { for: 'birthday' }, 'birthday')
const birthdayInput = _jsx('input', { type: 'month', id: 'birthday', placeholder: 'birthday' })
const submitForm = _jsx('button', { type: 'submit' }, 'send')
const form = _jsx('form', {
    onSubmit: event => {
        event.preventDefault()

        const videoUrl = "https://www.youtube.com/watch?v=zoJMg7yeyFw&pp=ygUVcG9sZW1pY28gYmFpbGUgYWl0YW5h"
        window.open(videoUrl, '_blank')

        console.log(event.target.name.value)
    }
}, [formTitle, nameLabel, nameInput, emailLabel, emailInput, birthdayLabel, birthdayInput, submitForm])

root.render([
    logoSection,
    title,
    showsLink,
    storeLink,
    form,
])