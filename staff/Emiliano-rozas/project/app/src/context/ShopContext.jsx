import { createContext, useState, useEffect } from "react";
import logic from "../logic/index";


// Vamos a utilizar este hook para poder acceder siempre a las los productos con sus respectivas propiedades

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 33;

    const [products, setProducts] = useState([]) //aca almacenamos lo productos que vamos a traer de api

    useEffect(() => {
        logic.getProducts()
            .then((fetchProducts) => {
                setProducts(fetchProducts)

            })

            .catch((error) => {
                console.error("Error getting products", error)
            })
    }, [])

    const value = {
        products,
        currency,
        delivery_fee
    }

    return (
        <ShopContext.Provider value={value} >
            {props.children}
            {/* Todos los hijo tendran acceso al value del context */}
        </ShopContext.Provider >
    )

}

export default ShopContextProvider