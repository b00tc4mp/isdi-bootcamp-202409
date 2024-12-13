import bcrypt from "bcryptjs";
import { User } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

export default async ({id, favorite }) => {

  console.log({id, favorite});
  try {

    const updateUser = await User
      .findByIdAndUpdate({_id: id}, { $addToSet: { favorites: favorite}}, { new: true }); // new: true hace que el valor retornado sea el nuevo luego de aplicar los cambios

    return updateUser;
    
  } catch (error) {
    console.log(error);
    
  }

};
