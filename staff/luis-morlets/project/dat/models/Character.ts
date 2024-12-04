import mongoose from 'mongoose'

import { CharacterType } from '../types/index.js'
import { character } from '../schemas/index.js'

const { model } = mongoose

const Character = model<CharacterType>('Character', character)

export default Character