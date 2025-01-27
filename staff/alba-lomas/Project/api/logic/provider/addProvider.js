


import jwt from 'jsonwebtoken'
import { Provider, User } from 'dat' 
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] 

  if (!token) {
    return res.status(401).json({ error })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    const userId = decoded.sub 

    const { name, email } = req.body

    validate.text(name)
    validate.email(email)

    const user = await User.findById(userId) 

    if (!user) {
      throw new NotFoundError('Usuario no encontrado')
    }

    await Provider.create({ userId, name, email })

    res.status(200).json({ message: 'Proveedor añadido correctamente' })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Sesión expirada o usuario inválido' })
    }

    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message })
    }

    return res.status(500).json({ error: error.message })
  }
}
