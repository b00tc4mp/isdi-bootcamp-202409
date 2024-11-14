import mongoose from 'mongoose'
import models from './models.js'
import './boost-mongoose.js'

const { ObjectId } = mongoose.Types

function connect(mongoUrl) { //creo un cliente y llamo a connect, que es un proceso asíncrono y es una promise chain q permite encadenar otras promesas
    return mongoose.connect(mongoUrl) //promesa q se ejecuta
        .then(() => { //promesa con callback q se encolará y se ejecutará cuando se haya ejecutado la anterior. En cada then hay un callback
            const db = mongoose.connection.db //elegimos en el paréntesis la base de datos de mongo a usar

            this.users = db.collection('users') //manejador para usuarios. uso this porq esa función es un método del objeto db
            this.posts = db.collection('posts') //manejador para posts

            this.disconnect = () => mongoose.disconnect()
        })
}

const db = { //objeto a exportar
    connect, //exporto esta función con el objeto db
    users: null,
    posts: null,
    disconnect: null,
    Object
}

export default db

export {
    models,
    ObjectId
}