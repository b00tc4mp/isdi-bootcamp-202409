export default callback =>
    async (req, res, next) => {
        try {
            //callback(req, res)
            //    .catch(next)
            await callback(req, res)
        } catch (error) {
            next(error)
        }
    }