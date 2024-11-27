import db from 'dat';
import {validate} from 'com';

const authenticateUser = (username, password) => {
    validate.username(username);
    validate.password(password);
    /*if (password.length < 8) throw new Error('invalid password');*/
    return db.users.findOne({username, password})
        .catch(error => {throw new Error (error.message)})
        .then(user => {
            if (!user) throw new Error('wrong credentials');

            return user._id.toString();
        })
    
}

export default authenticateUser;