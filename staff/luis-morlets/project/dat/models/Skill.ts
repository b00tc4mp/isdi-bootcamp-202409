import mongoose from 'mongoose'

import { skill } from '../schemas/index.js'
import { SkillType } from '../types/index.js'

const { model } = mongoose

const Skill = model<SkillType>('Skill', skill)

export default Skill