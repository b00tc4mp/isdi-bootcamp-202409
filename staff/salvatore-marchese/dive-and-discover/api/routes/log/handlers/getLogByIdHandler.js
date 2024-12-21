


export const getLogByIdHandler = async (req, res) => {
    const { id } = req.params

    try {
        const log = await LogBook.findById(id)
        if (!log) return res.status(404).json({ error: 'NotFoundError', message: 'Log not found' })

        res.json(log)
    } catch (error) {
        res.status(500).json({ error: 'SystemError', message: error.message })
    }
}