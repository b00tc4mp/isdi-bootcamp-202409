import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContext from './useContext'

export default function ManagePacks(props) {

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return (
        <div>
            <h1>Manage Customers</h1>
            <p>This will be the page to manage customers</p>
            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </div>
    )

}