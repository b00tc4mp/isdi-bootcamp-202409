import axios from 'axios'
import { validate, errors } from '../com'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { SystemError } = errors

const updateVaccinesDewornsPet = async (petId, vaccine, deworn) => {
    validate.id(petId, 'petId')

    try {
        const token = await AsyncStorage.getItem('token')
        if (!token) {
            throw new SystemError('token not found')
        }

        const response = await axios.patch('http://192.168.98.176:8080/veterinary/updatePet',
            {
                petId,
                vaccine,
                deworn
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
export default updateVaccinesDewornsPet