import { model, Schema } from 'mongoose'

const arc = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        unique: true,
        required: true
    }
})

const Arc = model('Arc', arc, 'arcs')

export default Arc