import mongoose from 'mongoose'
const {Model} = mongoose

Model.deleteById = function (id) {
    return this.deleteOne({ _id: id })
}