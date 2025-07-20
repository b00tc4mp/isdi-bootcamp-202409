const createFunctionalHandler = callback =>
    (req, res, next) => {
        try {
            callback(req, res)
                .catch(next)
        } catch (error) {
            next(error)
        }
    }

export default createFunctionalHandler