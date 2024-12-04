import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContex from './useContext'

export default function AssignPack(props) {
    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return (
        <main>
            <h1>Assing pack to customer</h1>
            <p>This page will be used to assign packs to customers</p>
            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )
}