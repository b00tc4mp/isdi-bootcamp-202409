import { Recommend } from 'dat'
import { validate, errors } from 'com'


const { SystemError, NotFoundError } = errors

const getRecommendByCategoryCountry = (userId, category, country) => {
    validate.id(userId, 'userId');
    validate.category(category, 'category')
    validate.country(country, 'country')

    return Promise.all([
        //user find
        Recommend.find({ category, country })
            .populate('author', 'username')
            .lean(),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([recommends]) => {// removed user from array
            if (!recommends) throw new NotFoundError('recommendations not found')
            //validate user
            recommends.forEach(recommend => {
                recommend.id = recommend._id.toString()
                delete recommend._id

                if (recommend.author._id) {
                    recommend.author.id = recommend.author._id.toString()
                    delete recommend.author._id
                }
            })

            return recommends
        })
}

export default getRecommendByCategoryCountry
