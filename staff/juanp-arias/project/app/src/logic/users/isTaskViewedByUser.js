import { extractPayLoad } from '../../util'

export default function (task) {
    const userId = extractPayLoad(sessionStorage.token).sub
    return task.viewed.some(user => user.id === userId)
}