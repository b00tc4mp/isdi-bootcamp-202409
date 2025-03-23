import 'dotenv/config'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Product } from 'dat'
import { errors } from 'com'
const { DuplicityError, ValidationError } = errors 
import createProduct from './createProduct.js'

describe('createProduct', () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))
  beforeEach(() => Product.deleteMany())
  afterEach(() => User.deleteMany())

  it('succeeds on valid product creation', async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
    })

    await expect(createProduct({
      name: "Chontaduro",
      price: 12,
      description: "Fruta colombiana",
      author: user._id,
      images: ["melon3.jpg"],
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      likes: []
    }))
      .to.eventually.have.property('_id')
  })

  it('fails on product duplicity', async () => {
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "josuecano@delgado.com",
      password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
    })

    await Product.create({
      name: "Chontaduro",
      price: 12,
      description: "Fruta colombiana",
      author: user._id,
      images: ["melon3.jpg"],
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      likes: []
    })

    await expect(createProduct({
      name: "Chontaduro",
      price: 12,
      description: "Fruta colombiana",
      author: user._id,
      images: ["melon3.jpg"],
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      likes: []
    }))
      .to.be.rejectedWith(DuplicityError, 'product already exists')
  })


  //  PRUEBA DE VALIDACIÓN
  describe('validation', () => {

    it('fails on missing name', async () => {
      const user = await User.create({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      })

      // omitimos el name por completo
      await expect(createProduct({
        // name: "faltante",
        price: 12,
        description: "Fruta colombiana",
        author: user._id,
        images: ["melon3.jpg"],
        category: "67531e4948f77b079b0d8191",
        subcategory: "6783c7583144cdb56480b6b9",
        likes: []
      }))
        .to.be.rejectedWith(ValidationError, 'product name is required')
    })

    it('fails on empty name', async () => {
      const user = await User.create({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      })

      await expect(createProduct({
        name: "",  // string vacío
        price: 12,
        description: "Fruta colombiana",
        author: user._id,
        images: ["melon3.jpg"],
        category: "67531e4948f77b079b0d8191",
        subcategory: "6783c7583144cdb56480b6b9",
        likes: []
      }))
        .to.be.rejectedWith(ValidationError, 'product name is required')
    })

    it('fails on missing price', async () => {
      const user = await User.create({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      })

      await expect(createProduct({
        name: "Chontaduro",
        // price: 12, // lo omitimos
        description: "Fruta colombiana",
        author: user._id,
        images: ["melon3.jpg"],
        category: "67531e4948f77b079b0d8191",
        subcategory: "6783c7583144cdb56480b6b9",
        likes: []
      }))
        .to.be.rejectedWith(ValidationError, 'invalid price')
    })

    it('fails on non-positive price', async () => {
      const user = await User.create({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      })

      // price <= 0
      await expect(createProduct({
        name: "Chontaduro",
        price: 0,
        description: "Fruta colombiana",
        author: user._id,
        images: ["melon3.jpg"],
        category: "67531e4948f77b079b0d8191",
        subcategory: "6783c7583144cdb56480b6b9",
        likes: []
      }))
        .to.be.rejectedWith(ValidationError, 'invalid price')
    })

    it('fails on missing description', async () => {
      const user = await User.create({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      })

      // description se omite
      await expect(createProduct({
        name: "Chontaduro",
        price: 12,
        // description: "Fruta colombiana",
        author: user._id,
        images: ["melon3.jpg"],
        category: "67531e4948f77b079b0d8191",
        subcategory: "6783c7583144cdb56480b6b9",
        likes: []
      }))
        .to.be.rejectedWith(ValidationError, 'product description is required')
    })

    it('fails on empty description', async () => {
      const user = await User.create({
        firstName: "josue",
        lastName: "cano",
        email: "josuecano@delgado.com",
        password: "$2a$10$zg6o7Ba3Zh1rkVcN57MkgupOeg6NFxW13OYEkKZBsgZIcSlvfhp7K",
      })

      await expect(createProduct({
        name: "Chontaduro",
        price: 12,
        description: "",
        author: user._id,
        images: ["melon3.jpg"],
        category: "67531e4948f77b079b0d8191",
        subcategory: "6783c7583144cdb56480b6b9",
        likes: []
      }))
        .to.be.rejectedWith(ValidationError, 'product description is required')
    })

  })

  after(() => db.disconnect())
})
