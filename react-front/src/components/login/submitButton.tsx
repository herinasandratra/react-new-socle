import { useState } from "react";
import { userApi } from "../../services/userServices/userApi"
import { getToken, getUser, setToken, setUser } from "../../utils/cookies"
import {useNavigate} from "react-router-dom"
import { toast,ToastContainer } from 'react-toastify';
import Loader from "../common/loader";
import { submitProps } from "./submitProps";

function SubmitPassword(props:submitProps){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const log = () =>{
        setLoading(()=> true)
        userApi
        .login(props)
        .then((response:any) => {
            if(response?.data?.token) setToken(response?.data?.token)
            if(response?.data?.user) setUser(JSON.stringify(response?.data?.user))
            if(getToken() && getUser()){
                navigate('/news')
            }
            setLoading(()=> false)

        })
        .catch(() => {
            setLoading(()=> false)
            toast('Invalid credential.')
        })
    }
    return (
        <>
            {loading ? <Loader/> :'' }
            <button onClick={log} className="btn btn-light">
                        Login
            </button>
            <ToastContainer/>
        </>
        
    );
}

export default SubmitPassword;