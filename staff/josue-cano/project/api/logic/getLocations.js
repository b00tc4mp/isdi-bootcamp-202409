import { Ubicacion } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default () => {
  console.log('get locations');
  return Ubicacion.find()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((locations) => {

      
      if (!locations) throw new NotFoundError("Ubicaciones not found");
      return locations;
    });
};
