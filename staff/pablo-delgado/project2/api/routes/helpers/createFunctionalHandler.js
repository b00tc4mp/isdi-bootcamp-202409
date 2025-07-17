export default callback =>
    async (req, res, next) => {
        try {
            await callback(req, res)
        } catch (error) {
            next(error)
        }
    }