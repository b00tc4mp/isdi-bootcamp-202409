import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContex from './useContext'

import { Button } from '../library';

export default function CreatePack(props) {
    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return (
        <div>
            <h1>Create new pack</h1>
            <p>This page will be used create new packs</p>
            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </div>
    )
}