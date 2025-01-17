import { Location } from "dat";
import { errors } from "com";

const { SystemError, NotFoundError } = errors;

export default () => {
  return Location.find()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((locations) => {
      if (!locations || locations.length === 0) {
        throw new NotFoundError("Locations not found");
      }

      return locations;
    });
};
