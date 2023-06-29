import Cookies from "js-cookie"

export const COOKIES = {
    USER: 'user',
    TOKEN: 'token'
}
export const setToken = (token:string)=>{
    Cookies.set(COOKIES.TOKEN, token)
}

export const setUser = (userStringify: string)=>{
    Cookies.set(COOKIES.USER,userStringify)
}

export const getUser = () =>{
    const userStringify = Cookies.get(COOKIES.USER)
    if(userStringify) return JSON.parse(userStringify)
    else return {}
}

export const getToken = ()=>{
    return Cookies.get(COOKIES.TOKEN)
}

export const clearLogin =() =>{
    Cookies.remove(COOKIES.USER)
    Cookies.remove(COOKIES.TOKEN)
}