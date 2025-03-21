import jwt from 'jsonwebtoken'

export function authorizationHandler(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.sub // Guarda el userId en la request
        next() // Pasa al siguiente middleware o controlador
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
}
