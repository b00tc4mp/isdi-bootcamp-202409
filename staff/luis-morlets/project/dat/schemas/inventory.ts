import mongoose from 'mongoose'

const { Schema, Types: { ObjectId } } = mongoose

const inventory = new Schema({
    items: [{
        type: ObjectId,
        ref: 'Item'
    }],
    currency: Number
}, { versionKey: false })

export default inventory