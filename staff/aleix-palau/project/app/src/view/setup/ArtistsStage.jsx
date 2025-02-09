import { Button, Form, Field, Label, Checkbox } from '../library'
import logic from '../../logic'
import { errors } from 'com'
import useContext from '../useContext'
import { useState } from 'react'

const { SystemError } = errors

export default function ArtistsStage(props) {
    console.log('ArtistsStage -> render')

    const { alert } = useContext()

    const availableArtists = [
        'Taylor Swift',
        'The Weeknd',
        'The Strokes',
        'Daughter',
        'Adele',
        'Billie Eilish',
        'Bon Iver',
        'Harry Styles',
        'Bad Bunny',
        'Coldplay',
    ]

    const [selectedArtists, setSelectedArtists] = useState([])

    const handleArtistChange = artist => {
        if (selectedArtists.includes(artist))
            // Updates the selectedArtists state with the new array, effectively "unchecking" the checkbox for this artist
            setSelectedArtists(selectedArtists.filter(a => a !== artist)) // ensures the artist being removed is excluded from the new array
        else
            setSelectedArtists([...selectedArtists, artist]) // creates a new array with the added artist (immutability -> important in React)
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (selectedArtists.length === 0) {
            alert('Please select at least one artist.')

            return
        }

        logic.updateUserProfile({ artists: selectedArtists })
            .then(() => logic.updateUserStage('completed'))
            .then(() => {
                props.onSetupComplete()
            })
            .catch(error => {
                if (error instanceof SystemError) {
                    alert('Sorry, try again later.')
                } else {
                    alert(error.message)
                }
                console.error(error)
            })
    }

    return (
        <main className="justify-self-center">
            <h2>Your Music</h2>

            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label>Tell us your favourite artists...</Label>
                    {availableArtists.map(artist => (
                        <Checkbox
                            key={artist}
                            id={artist}
                            value={artist}
                            checked={selectedArtists.includes(artist)}
                            onChange={() => handleArtistChange(artist)}
                        >
                            {artist}
                        </Checkbox>
                    ))}
                </Field>

                <Button type="submit">Next</Button>
            </Form>
        </main>
    )
}