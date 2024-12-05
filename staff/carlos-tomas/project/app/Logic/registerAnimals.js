import { validate, errors } from '../com'
import axios from 'axios'

const { SystemError } = errors

export default async (chip, name, race, sex, weigth, sterilized, dataBirth) => {
    validate.name(name)


    try {
        const response = await axios.post('http://192.168.98.176:8080/RegisterAnimal', {
            chip,
            name,
            race,
            sex,
            weigth,
            sterilized,
            dataBirth
        })

        return response.data
    } catch (error) {

        if (error.response) {
            const { data } = error.response;
            throw new errors[data.error](data.message);
        } else {
            throw new SystemError(error.message);

        }
    }
}