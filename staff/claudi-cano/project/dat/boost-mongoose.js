import { Model } from 'mongoose'

Model.deletedById = function (id) {
    return this.deleteOne({ _id: id })
}