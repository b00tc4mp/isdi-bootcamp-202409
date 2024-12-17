import { Item, Player } from 'dat'
import { validate, errors } from 'com'
import ItemType from 'dat/types/ItemType.js'

const { SystemError, NotFoundError } = errors

export default (playerId: string, itemId: string): Promise<ItemType> => {
    validate.id(playerId, 'playerId')
    validate.id(itemId, 'itemId')

    return (async () => {
        let player, item

        try {
            const players = await Player.findById(playerId).lean()

            player = players
        } catch (error) { throw new SystemError((error as Error).message) }

        if (!player) { throw new NotFoundError('player not found') }

        try {
            const items = await Item.findById(itemId).lean()

            item = items

            if (!item) throw new NotFoundError('item not found')

            return { id: item._id.toString(), name: item.name, description: item.description, quantity: item.quantity, buyPrice: item.buyPrice, sellPrice: item.sellPrice, type: item.type, effect: item.effect }

        } catch (error) { throw new SystemError((error as Error).message) }
    })()
}