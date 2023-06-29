import { useState } from "react";
import { userApi } from "../../services/userServices/userApi"
import { clearLogin} from "../../utils/cookies"
import {useNavigate} from "react-router-dom"
import { toast,ToastContainer } from 'react-toastify';
import Loader from "../common/loader";

function Logout(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const log = () =>{
        setLoading(()=> true)
        userApi
        .logout()
        .then(() => {
            setLoading(()=> false)
        })
        .catch(() => {
            setLoading(()=> false)
            toast('Error logout')
        })
        .finally(()=> {
            clearLogin()
            navigate('/')
        })
    }
    return (
        <>
            {loading ? <Loader/> :'' }
            <button onClick={log} className="btn btn-light">
                <i className="fas fa-power-off"></i>Logout
            </button>
            <ToastContainer/>
        </>
        
    );
}

export default Logout;