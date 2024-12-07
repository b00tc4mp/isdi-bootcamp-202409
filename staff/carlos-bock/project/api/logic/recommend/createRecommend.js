import { User, Recommend } from '../../../dat/index.js'
import validate from '../../../com/validate.js'; import errors from '../../../com/errors.js';

const { SystemError, NotFoundError } = errors

const createRecommend = (userId, city, country, category, price, link, imageUrl, recommend, subject) => {
    validate.id(userId, 'userId')
    validate.text(city)
    validate.text(country)
    validate.text(recommend)
    //add validate for catory
    //add validate for price
    validate.image(link) // change validate image to a more generic name
    validate.image(imageUrl)
    validate.text(subject)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Recommend.create({
                author: userId,
                city: city,
                country: country,
                category: category,
                price: price,
                link: link,
                image: imageUrl,
                text: recommend,//consider renaming in mongo data model
                subject: subject
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

export default createRecommend