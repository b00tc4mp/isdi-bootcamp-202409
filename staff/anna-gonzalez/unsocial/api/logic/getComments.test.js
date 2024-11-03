import getComments from './getComments.js'

try {
    const comments = getComments('m2w6j6gxyd')
    console.log(comments)
} catch (error) {
    console.error(error)
}