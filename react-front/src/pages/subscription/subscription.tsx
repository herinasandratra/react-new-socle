import { useEffect, useState } from "react";
import SubscriptionButton from "../../components/subscription/subscriptionButton";
import { Link, useNavigate } from "react-router-dom";
import InformationUser from "../../components/subscription/informationUser";
import { getToken, getUser } from "../../utils/cookies";
export type userDataType ={
    id?:number,
    surname:string,
    name:string,
    address: string,
    email: string,
    zip: string,
    city: string,
    password: string,
    remember_password?: string,
    language?: string,
    birthdate?:string,
    author_id?:number,
    source_id?:number,
    category_id?:number
}

function Subscription() 
{
    const [userData, setUserData] = useState<userDataType>({
        surname:'',
        name:'',
        address: '',
        email: '',
        zip: '',
        city: '',
        password: '',
        remember_password: '',
        language: 'en'
    })
    const updateUserData = (updatedUserdata: userDataType): void => {
        setUserData(() => updatedUserdata )
    }
    const navigate = useNavigate()
    useEffect(()=>{
        if(getToken() && getUser()) navigate("/preference")
    })
    return (
        <div className="row">
            
            <div className="col"></div>
            <div className="col-md-5 col-sm-9">
                <h1>Subscription</h1>
                <InformationUser {...userData} onChange={updateUserData} />
                <SubscriptionButton {...userData} />
                <Link
                    to={"/"}
                >
                    Already user
                </Link>
            </div>
            <div className="col"></div>
        </div>
    );
}

export default Subscription;