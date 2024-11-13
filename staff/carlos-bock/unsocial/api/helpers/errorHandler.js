import { errors } from 'com';

const { ValidationError, 
    SystemError, 
    DuplicityError, 
    CredentialsError, 
    NotFoundError, 
    OwndershipError} = errors;

export default (error, req, res, next) => {
    let status = 500;

    if (error instanceof ValidationError) status = 406;
    else if (error instanceof NotFoundError) status = 404;
    else if (error instanceof CredentialsError) status = 401;
    else if (error instanceof DuplicityError) status = 409;
    else if (error instanceof OwndershipError) status = 403;

    res.status(status).json({ error: status === 500 ? SystemError.name : error.constructor});

    console.error(error);
}