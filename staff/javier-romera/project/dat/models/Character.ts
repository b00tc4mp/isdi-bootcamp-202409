import { model } from 'mongoose'

import { TCharacter } from '../types/index.js'
import { character } from '../schemas/index.js'

const Character = model<TCharacter>('Character', character, 'characters')

export default Character