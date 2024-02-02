import { getCookie, hasCookie, setCookie } from "cookies-next";


export const getCookiesCart = ():{[id:string]:number} => {

    if(hasCookie('cart')){
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart
    }

    return {}
}

export const addProductCart = (id:string) => {
    const cookiesCart = getCookiesCart()

    if (cookiesCart[id]){
        cookiesCart[id] = cookiesCart[id] + 1
    }else{
        cookiesCart[id] = 1
    }

    setCookie('cart', JSON.stringify(cookiesCart))
}

export const removeProductFromCart = (id:string) => {

    const cookiesCart = getCookiesCart()
    delete cookiesCart[id]
    setCookie('cart', JSON.stringify(cookiesCart))
}

export const removeSingleItemFromCart = (id:string) => {
    
        const cookiesCart = getCookiesCart()
        if (!cookiesCart[id]) return

        if (cookiesCart[id] <= 0 ){
            delete cookiesCart[id]
        }else{
            cookiesCart[id] = cookiesCart[id] - 1
        }
    
        setCookie('cart', JSON.stringify(cookiesCart))
}