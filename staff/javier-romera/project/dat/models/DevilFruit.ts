import { model, Schema } from 'mongoose'

const devilFruit = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    }
})

const DevilFruit = model('DevilFruit', devilFruit)

export default DevilFruit