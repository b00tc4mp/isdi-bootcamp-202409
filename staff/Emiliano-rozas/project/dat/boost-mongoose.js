import { Model } from 'mongoose'

Model.deleteById = function (id) {
    return this.deleteOne({ _id: id })
}