export default (req, res, next) => {
    try {
        const userId = req.header.authorization.slice(6)

        req.userId = userId

        next()
    } catch (error) {
        next(error)
    }
}