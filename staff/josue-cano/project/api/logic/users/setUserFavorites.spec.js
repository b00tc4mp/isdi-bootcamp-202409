import "dotenv/config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User } from "dat";
import { errors } from "com";
import setUserFavorites from "./setUserFavorites.js";

const { ValidationError } = errors;

describe("setUserFavorites", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST));

  beforeEach(async () => {
    await User.deleteMany();
  });

  after(() => db.disconnect());

  // Falla si el id es incorrecto
  it("fails on invalid id", async () => {
    await expect(setUserFavorites({ id: "1234", favorite: "678928c5a0dc6487dddca4bb" })).to.be.rejectedWith(
      ValidationError,
      "invalid id length"
    );
  });

  // Retorna null si el user no existe
  it("returns null if user not found", async () => {
    const fakeUserId = "0123456789abcdef01234567";

    const result = await setUserFavorites({
      id: fakeUserId,
      favorite: "678928c5a0dc6487dddca4bb",
    });

    expect(result).to.be.null;
  });

  //
  // + un favorito si no está en la lista
  it("adds the favorite if not present in user's favorites", async () => {
    //  un user con favorites vacíos
    const user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "hashedpwd",
      favorites: [],
    });

    //  un favorite ID
    const favoriteId = "678928c5a0dc6487dddca4bb";

    // Llamamos a setUserFavorites
    const updatedUser = await setUserFavorites({
      id: user._id.toString(),
      favorite: favoriteId,
    });

    expect(updatedUser).to.exist;

    // Convertimos los ObjectIds a string para verificar
    const updatedFavs = updatedUser.favorites.map((f) => f.toString());
    expect(updatedFavs).to.include(favoriteId);
  });

  // Quita un favorito si ya estaba en la lista
  it("removes the favorite if it is already present", async () => {
    // Creamos un user que ya tiene 2 favoritos (ambos 24 chars)
    const user = await User.create({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "hashedpwd",
      favorites: ["678928c5a0dc6487dddca4bb", "0123456789abcdef01234567"],
    });

    const favoriteId = "678928c5a0dc6487dddca4bb";

    const updatedUser = await setUserFavorites({
      id: user._id.toString(),
      favorite: favoriteId,
    });

    expect(updatedUser).to.exist;

    //  'favoriteId' se haya sacado de la lista
    const updatedFavs = updatedUser.favorites.map((f) => f.toString());
    expect(updatedFavs).to.not.include(favoriteId);
    // El otro favorito sigue
    expect(updatedFavs).to.include("0123456789abcdef01234567");
  });
});
