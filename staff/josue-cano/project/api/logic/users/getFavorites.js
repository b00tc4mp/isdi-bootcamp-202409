import bcrypt from "bcryptjs";
import { User, Producto } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

export default async ({id }) => {

  console.log({ id });
  try {

    const user = await User.findOne({_id: id}); 

    const favorites = await Product.find({_id: { $in: user.favorites}});


    return favorites;
    
  } catch (error) {
    console.log(error);
    
  }

};
