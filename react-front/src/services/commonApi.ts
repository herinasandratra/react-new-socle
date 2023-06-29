import axios from 'axios'
import { clearLogin,getToken } from '../utils/cookies';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

axios.interceptors.response.use((response:any) => response
,(error:any)=>{
    if(error.response && error.response.status === 401) {
        clearLogin()
        window.location.href = '/'
    }
    return Promise.reject(error)
})
class CommonApi {
    private token = getToken()

    constructor(){
        this.token = getToken()
    }
    public headerJson = this.token?  {
        'Authorization':`Bearer ${this.token}`,
        'Content-Type': 'application/json'
    }: {
        'Content-Type': 'application/json'
    } ;

    public headerFormData = this.token? {
        'Authorization':`Bearer ${this.token}`,
        'Content-Type': 'multipart/form-data'
    } :{
        'Content-Type': 'multipart/form-data'
    } ;

    post(url: string, data: any, type: string = 'json', timeout=0) {
        if(0 === timeout) {
            return  axios.post(url, data,
            {
                headers: type ==='json' ?this.headerJson: this.headerFormData
            })
        }
        return  axios.post(url, data,
            {
                headers: type ==='json' ?this.headerJson: this.headerFormData,
                timeout: timeout
            })
    }

    put(url:string,data:any,type:string='json'){
        return  axios.put(url, data,
        {
            headers: type ==='json' ?this.headerJson: this.headerFormData
        })
    }

    patch(url:string,data:any,type:string='json'){
        return  axios.patch(url, data,
        {
            headers: type ==='json' ?this.headerJson: this.headerFormData
        })
    }

    delete(url:string,params:any={},type:string='json'){
        return  axios.delete(url,
            params?
            {
                headers: type ==='json' ?this.headerJson: this.headerFormData,
                params
            }:
            {
                headers: type ==='json' ?this.headerJson: this.headerFormData
            }

        )
    }

    get(url:string, params:any={},type:string='json', cancelToken:any =null){
        if(null === cancelToken) {
            return  axios.get(url,
                !params?
                {
                    headers: type ==='json' ?this.headerJson: this.headerFormData
                }:
                {
                    headers: type ==='json' ?this.headerJson: this.headerFormData,
                    params
                }
            )
        } else {
            return  axios.get(url,
                !params?
                {
                    headers: type ==='json' ?this.headerJson: this.headerFormData,
                    cancelToken: cancelToken
                }:
                {
                    headers: type ==='json' ?this.headerJson: this.headerFormData,
                    params,
                    cancelToken: cancelToken
                }
            )  
        }
    }
}

export default  CommonApi;