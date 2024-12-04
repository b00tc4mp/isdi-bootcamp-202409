import { useState } from 'react'

import { Button } from '../library/index.js'
//create and import comments compo

import logic from '../../logic/index.js'

import useContext from '../useContext.js'

//create and import a stylesheet

export default function Recommend({ recommend }) {
    const [view, setView] = useState(null)

    //TODO custom alert with useContext

    const {
        id,
        author,
        image,
        text,
        date,
        upVotes,
        comments,
        country,
        city,
        category,
        price,
        subjectsetState
    } = recommend

    const handleDeleteClick = () => {
        confirm('Borrar recommendación o guía', accepted => { //make alert dynamic on context
            if (accepted) {
                try {
                    logic.deleteRecommedn(id)
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        })
    }

}

