import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
// Estandarizacion de los items, parecido a  ex PostItem. Marcamos las props que vamos a recibir del objecto producto, lo de currency podria  ser interesante mantenerlo, el chat tira que en un futuro podria servir para modificar mas facil la currency en caso de location y tal, de momento no molesta, si empieza a joder AFUERA.

// Clave lo del tema del ID :to={`/product/${id}` con esto nos vamos ahorrar una banda de tiempo a la hora de crear cada producto, estandarizando la pagina de Producto como tal, la rederizacion de cada prod casi que se hara de manera automatica, o eso espero.
export default function ProductItem({ id, image, name, price }) {
    const { currency } = useContext(ShopContext)

    return (
        <Link className='text-white cursor-pointer hover:text-green-700' to={`/product/${id}`}>
            <div className='w-full aspect-[2/3] overflow-hidden'>
                <img className='object-obtain w-full h-full hover:scale-110 transition ease-in-out rounded-lg' src={image} alt={name} />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link >
    )
}

