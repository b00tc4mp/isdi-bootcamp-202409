import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContex from './useContext'

export default function ManagePurchasedPacks(props) {
    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return (
        <main>
            <h1>Manage Purchased Packs</h1>
            <p>This will be the page to manage purchased packs page</p>
            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )
}