import { connect, disconnect } from 'mongoose'
import { User, LogBook, Place, Point, CenterLocation, OpeningHours, FaunaFlora,} from './models.js'
/* import './boost-mongoose.js' */


const db = {
    connect,
    disconnect
}

export default db

export {
    User,
    LogBook,
    Place,
    Point,
    CenterLocation,
    OpeningHours,
    FaunaFlora,
    
}