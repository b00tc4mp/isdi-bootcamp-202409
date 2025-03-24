import bcrypt from 'bcryptjs'

import { Player } from 'dat'
import { validate, errors } from 'com'

const { SystemError, CredentialsError } = errors

export default (username: string, password: string): Promise<{ id: string }> => {
    validate.username(username)
    validate.password(password)

    return (async () => {
        let player

        try {
            player = await Player.findOne({ username })
        } catch (error) {
            if (error instanceof SystemError) throw new SystemError((error as Error).message)
        }

        if (!player) throw new CredentialsError('wrong credentials')

        let match

        try {
            match = await bcrypt.compare(password, player.password)
        } catch (error) {
            if (error instanceof SystemError) throw new SystemError((error as Error).message)
        }

        if (!match) throw new CredentialsError('wrong credentials')

        return { id: player._id.toString() }

    })()
}