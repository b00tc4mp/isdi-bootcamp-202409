const createFunctionalHandler =
    async (req, res, next) => {
        try {
            await callback(req, res)
        } catch (error) {
            next(error);
        }
    }

export default createFunctionalHandler;