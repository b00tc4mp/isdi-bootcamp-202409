import { createContext, useState, useEffect } from "react"
import logic from "../logic/index"


// Vamos a utilizar este hook para poder acceder siempre a las los productos con sus respectivas propiedades

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '$'
    const delivery_fee = 5

    const [products, setProducts] = useState([]) //aca almacenamos lo productos que vamos a traer de api
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [cart, setCart] = useState({ items: [], totalPrice: 0 })

    useEffect(() => {
        logic.getProducts()
            .then(fetchProducts => {
                setProducts(fetchProducts)

            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        try {
            const loggedIn = logic.isUserLoggedIn()
            console.log('Initial userLoggedIn:', loggedIn)

            setUserLoggedIn(loggedIn)

            if (loggedIn) {
                logic.getCart()
                    .then(userCart => {
                        console.log('Cart fetched:', userCart)
                        setCart(userCart)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        } catch (error) {
            console.error(error)
        }
    }, [userLoggedIn])


    const value = {
        products,
        currency,
        delivery_fee,
        userLoggedIn,
        setUserLoggedIn,
        cart,
        setCart
    }

    return (
        <ShopContext.Provider value={value} >
            {props.children}
            {/* Todos los hijo tendran acceso al value del context */}
        </ShopContext.Provider >
    )

}

export default ShopContextProvider