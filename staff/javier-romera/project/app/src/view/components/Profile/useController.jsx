import logic from '../../../logic'

import { useEffect, useState } from 'react'

import useContext from '../../useContext'

import { errors } from 'com'
const { SystemError } = errors

export default function useController() {
    const [userDetails, setUserDetails] = useState()
    const [hasUpdatedProfile, setHasUpdatedProfile] = useState()

    const { alert, confirm } = useContext()

    useEffect(() => {
        try {
            logic.getUserDetails()
                .then(details => setUserDetails(details))
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        if (hasUpdatedProfile) setHasUpdatedProfile(false)
    }, [hasUpdatedProfile])

    const handleSubmit = event => {
        event.preventDefault()

        document.getElementById("updateButton").focus()

        confirm('Are you sure you want to update your profile?', accepted => {
            if (accepted) {
                const { target: form } = event

                const {
                    username: { value: username },
                    email: { value: email },
                    ['old-password']: { value: oldPassword },
                    ['new-password']: { value: newPassword },
                    ['new-password-repeat']: { value: newPasswordRepeat }
                } = form

                try {
                    logic.updateUserProfile(username, email, oldPassword, newPassword, newPasswordRepeat)
                        .then(() => {
                            alert('Your profile has been successfully updated!', 'success')
                            setHasUpdatedProfile(true)

                            form.reset()
                        })
                        .catch(error => {
                            if (error instanceof SystemError)
                                alert('Sorry, try again later')
                            else
                                alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        }, 'warn')
    }

    return {
        userDetails,

        handleSubmit
    }
}