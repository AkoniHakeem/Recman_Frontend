import { useContext } from "react"
import { AppContext } from "../../components/contexts/appContext"

const useCart = function() {
    const cart = useContext(AppContext).cartContext.cart
    const addToCart = () => {

    }

    const updateCart = function () {

    }

    const removeFromCart = function() {

    }

    const emptyCart = function () {

    }

    return [cart, {updateCart, removeFromCart, emptyCart}]

}

export default useCart