import axios from 'axios'
import { validate, errors } from '../com'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { SystemError } = errors

export default async (chip, name, race, sex, weight, sterilized, dateOfBirth) => {
    validate.chip(chip)
    validate.name(name)
    validate.race(race)
    validate.sex(sex)
    validate.weight(weight)
    validate.sterilized(sterilized)
    validate.dateOfBirth(dateOfBirth)


    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new SystemError('token not found')
        }

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/veterinary/registerPet`,
            {
                chip,
                name,
                race,
                sex,
                weight,
                sterilized,
                dateOfBirth,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

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