// import "dotenv/config";
// import * as chai from "chai";
// import chaiAsPromised from "chai-as-promised";
// chai.use(chaiAsPromised);
// const { expect } = chai;
// import { errors } from "com";
// const { NotFoundError } = errors;

// import db, { User, Product } from "dat";
// import deleteProduct from "./deleteProduct.js";

// describe("deleteProduct", () => {
//   before(() => db.connect(process.env.MONGO_URL_TEST));
//   beforeEach(async () => {
//     await User.deleteMany();
//     await Product.deleteMany();
//   });
//   afterEach(async () => {
//     await User.deleteMany();
//     await Product.deleteMany();
//   });
//   after(() => db.disconnect());

//   it("removes the specified product", async () => {
//     const user = await User.create({
//       firstName: "josue",
//       lastName: "cano",
//       email: "test2@test.com",
//       password: "123123123"
//     });
//     const createdProduct = await Product.create({
//       name: "TestProduct",
//       author: user._id,
//       price: 100,
//       description: "Sample Description",
//       category: "67531e4948f77b079b0d8191",
//       subcategory: "6783c7583144cdb56480b6b9",
//       images: ["testproduct.jpg"],
//       likes: []
//     });
//     const result = await deleteProduct({ productId: createdProduct._id, userId: user._id });
//     expect(result.deletedCount).to.equal(1);
//   });

//   it("can not remove the specified product", async () => {
//     // Como deleteProduct es asíncrono, usamos "await" y chai-as-promised
//     await expect(
//       deleteProduct({ productId: "randomid", userId: "randomuserid" })
//     ).to.be.rejectedWith(NotFoundError, "No puedes borrar este producto")
//   })
// });

import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import { errors } from "com";
const { NotFoundError } = errors;

import db, { User, Product } from "dat";
import deleteProduct from "./deleteProduct.js";

describe("deleteProduct", () => {
  before(async () => {
    // Conectamos a la base de datos de testing
    await db.connect(process.env.MONGO_URL_TEST);
  });

  beforeEach(async () => {
    // Limpiamos la colección de usuarios y productos antes de cada prueba
    await User.deleteMany();
    await Product.deleteMany();
  });

  afterEach(async () => {
    // También limpiamos después de cada prueba
    await User.deleteMany();
    await Product.deleteMany();
  });

  after(async () => {
    // Cerramos la conexión al finalizar todas las pruebas
    await db.disconnect();
  });

  it("removes the specified product", async () => {
    // Creamos un usuario
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "test2@test.com",
      password: "123123123",
    });

    // Creamos un producto asociado a ese usuario
    const createdProduct = await Product.create({
      name: "TestProduct",
      author: user._id,
      price: 100,
      description: "Sample Description",
      category: "67531e4948f77b079b0d8191",
      subcategory: "6783c7583144cdb56480b6b9",
      images: ["testproduct.jpg"],
      likes: [],
    });

    // Intentamos borrar el producto
    const result = await deleteProduct({
      productId: createdProduct._id,
      userId: user._id,
    });

    // Verificamos que se haya borrado
    expect(result.deletedCount).to.equal(1);
  });

  it("fails with NotFoundError if the product does not exist or does not belong to user", async () => {
    // Creamos un usuario cualquiera
    const user = await User.create({
      firstName: "josue",
      lastName: "cano",
      email: "test2@test.com",
      password: "123123123",
    });

    // Pasamos un productId y userId que no coinciden con ningún producto
    await expect(
      deleteProduct({ productId: "randomid", userId: user._id })
    )
      .to.be.rejectedWith(NotFoundError, "No puedes borrar este producto");
  });


});
