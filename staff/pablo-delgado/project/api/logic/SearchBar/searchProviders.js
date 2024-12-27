import { Provider, Category } from '../../../../data/models.js'  // Ajusta el path de importación a tu estructura
import { validate, errors } from '../../../../com/index.js'

const { SystemError } = errors

export default (query, distance, coords) => {
    // Si query está vacío, no realizamos la validación de string y le damos un valor predeterminado
    if (query && query.trim() !== '') {
        validate.string(query, 'query')
    } else {
        query = '' // Deja query vacío si no tiene valor
    }
    
    // Validación de otros parámetros
    validate.number(distance, 'distance')
    validate.array(coords, 'coords')
    validate.number(coords[0], 'longitude')
    validate.number(coords[1], 'latitude')

    return Provider.find({
        $or: [
            { name: new RegExp(query, 'i') },                // Busca en el nombre del proveedor
            { category: { $regex: new RegExp(query, 'i') } },    // Busca en las et // Busca en los servicios de las categorías
        ]
    })
    .populate({
        path: 'categories', // Poblamos las categorías del proveedor
        select: 'services'  // Solo seleccionamos los servicios
    })
    .lean()  // Para evitar obtener instancias de mongoose
    .then(providers => {
        if (!providers || providers.length === 0) {
            throw new SystemError('No providers found');
        }

        return providers;
    })
    .catch(error => {
        throw new SystemError(error.message);
    });
};
