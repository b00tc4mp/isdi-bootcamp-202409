import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, AuthorizationError } = errors

export default (userId, title, author, publisher, isbn, price, description, category, status, stock, image, images, bestSeller) => {
    validate.id(userId, 'userId')
    validate.title(title)
    validate.author(author)
    validate.publisher(publisher)
    validate.isbn(isbn)
    validate.price(price)
    validate.description(description)
    validate.category(category)
    validate.status(status, 'product')
    validate.stock(stock)
    validate.image(image)
    if (images) {
        validate.images(images);
    }
    validate.bestSeller(bestSeller)

    return async () => {

        try {
            const user = await User.findById(userId)

            if (!user) throw new SystemError('User not found')
            if (user.role !== 'moderator') throw new AuthorizationError("Not authorized");

            await Product.create({
                title,
                author,
                publisher,
                isbn,
                price,
                description,
                category,
                status,
                stock,
                image,
                images,
                bestSeller
            })

            return { message: "Product created successfully" }
        }
        catch (error) {
            throw new SystemError(error.message)

        }
    }
}
