import { USER_URL } from "./url";
import CommonApi from "../commonApi";
import { submitProps } from "../../components/login/submitProps";
import { userDataType } from "../../pages/subscription/subscription";
class UserApi{
    login(params:submitProps): Promise<any>{
        const axios = new CommonApi()
        return axios.post(USER_URL.LOGIN,{
            email:params.login.trim().toLowerCase(),
            password: params.password
        })
    }
    subscribe (params: userDataType): Promise<any>{
        const axios  = new CommonApi()
        const myParams = {...params}
        delete myParams.remember_password
        return axios.post(USER_URL.SUBSCRIBE,myParams)
    }
    logout (): Promise <any>{
        const axios = new CommonApi()
        return axios.post(USER_URL.LOGOUT,{})
    }
}
export const userApi = new UserApi()