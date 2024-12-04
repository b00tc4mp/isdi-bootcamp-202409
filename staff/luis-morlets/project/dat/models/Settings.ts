import mongoose from 'mongoose'

import { settings } from '../schemas/index.js'
import { SettingsType } from '../types/index.js'

const { model } = mongoose

const Settings = model<SettingsType>('Settings', settings)

export default Settings