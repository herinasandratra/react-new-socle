import { ToastContainer, toast } from "react-toastify";
import { userDataType } from "../../pages/subscription/subscription";
import { userApi } from "../../services/userServices/userApi";
import Loader from "../common/loader";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { setUser } from "../../utils/cookies";

function SubscriptionButton(props:userDataType){
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const log = () =>{
        if(props.password !== props.remember_password) {
            toast('The two passwords entered do not match')
            return ''
        }
        setLoading(() => true)
        userApi.subscribe(props).then((response:any) =>{
            const {user} = response?.data
            if(user) setUser(JSON.stringify(user))
            setLoading(() => false)
            navigate('/')
        }).catch((error:any) => {
            setLoading(false)
            toast('An error occured');
            if(error?.response?.data?.error?.name?.length)  toast(error?.response?.data?.error?.name[0])
            if(error?.response?.data?.error?.email?.length)  toast(error?.response?.data?.error?.email[0])
            if(error?.response?.data?.error?.password?.length)  toast(error?.response?.data?.error?.password[0])
        })
    }
    return (<>
    {loading ? <Loader /> :''}
    <button onClick={log} className="btn btn-light mt-3">
        {props?.id ? 'Save' :'Subscribe'}
    </button>
    <ToastContainer/>
    </>)
}

export default SubscriptionButton;