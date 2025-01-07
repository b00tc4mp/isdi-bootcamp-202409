import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'
const { CredentialsError } = errors


import authenticateUser from './authenticateUser.js'



describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST)) //Antes de ejecutar las pruebas, conecta la base de datos a la URL definida en la variable de entorno MONGO_URL_TEST

    beforeEach(() => User.deleteMany()) //Antes de cada prueba, limpia la colección de usuarios para asegurarse de que las pruebas sean independientes

    it('succeeds on existing user', async () => { //Define una prueba para verificar que la autenticación funcione con un usuario válido
        await User.create({ name: 'Juan Pérez', email: 'juan.perez@example.com', password: bcrypt.hashSync('123123123', 10) })

        const user = await authenticateUser('juan.perez@example.com', '123123123')

        expect(user).to.exist //Verifica que el objeto devuelto por authenticateUser exista (no sea null o undefined
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('user')
    })

    it('fails on non-existing user', () =>
        expect(
            authenticateUser('juan.perez@example.com', '123321321')
        ).to.be.rejectedWith(CredentialsError, 'wrong credentials')
    )

    after(() => db.disconnect())
})
