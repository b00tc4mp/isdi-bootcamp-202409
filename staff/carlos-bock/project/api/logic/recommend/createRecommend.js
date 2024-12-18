import { User, Recommend } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const createRecommend = (userId, city, country, category, price, link, imageUrl, recommend, subject) => {
    validate.id(userId, 'userId')
    validate.text(city)
    validate.text(country)
    validate.text(recommend)
    validate.category(category)
    validate.price(price)
    validate.link(link)
    validate.link(imageUrl)
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
                text: recommend,
                subject: subject
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

export default createRecommend