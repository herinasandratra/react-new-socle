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
        setLoading(() => true)
        userApi.subscribe(props).then((response:any) =>{
            const {user} = response?.data
            if(user) setUser(JSON.stringify(user))
            setLoading(() => false)
            navigate('/')
        }).catch(() => {
            setLoading(false)
            toast('This email has already been taken.')
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