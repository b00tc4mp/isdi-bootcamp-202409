import { Schema } from 'mongoose'

const condition = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['equal', 'greater than equal', 'lower than equal']
    },
    property: {
        type: String,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
    direction: {
        type: String,
        required: true,
        enum: ['row', 'column']
    },
    indexes: [{
        type: Number,
        required: true
    }],
    text: {
        type: String,
        required: true
    }
}, { versionKey: false })

export default condition