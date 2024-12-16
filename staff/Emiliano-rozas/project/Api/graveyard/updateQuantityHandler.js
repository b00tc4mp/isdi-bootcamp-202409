import logic from '../logic/index.js';
import { createFunctionalHandler } from '../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { cartItemId }, body: { newQuantity } } = req

    return logic.updateQuantity(userId, cartItemId, newQuantity).then(() => res.status(200).json({ message: 'Item updated successfully' }))
})