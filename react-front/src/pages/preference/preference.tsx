import { useEffect, useState } from "react";
import { userDataType } from "../subscription/subscription";
import InformationUser from "../../components/subscription/informationUser";
import SubscriptionButton from "../../components/subscription/subscriptionButton";
import Navigation from "../../components/navigation/navigation";
import PreferenceForm from "../../components/preference/preferenceDetail";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../utils/cookies";

function UserPreference() {
    const user = getUser() as userDataType

    const [userData, setUserData] = useState<userDataType>(user ?? {
        surname:'',
        name:'',
        address: '',
        email: '',
        zip: '',
        city: '',
        password: '',
        remember_password: '',
        language : 'en'
    })
    
   const updateUserData = (updatedUserdata: userDataType): void => {
       
       setUserData(() => updatedUserdata )
   }
   const navigate = useNavigate()
   const token = getToken()
   useEffect(()=>{
     if(!( token && user )) navigate("/")
   },[user,token,navigate])
    return (
        <>
            <Navigation/>
            <div className="row">
                
                <div className="col-md-1"></div>
                <div className="col-md-6 col-sm-9">
                    <h2>Your information</h2>
                    <InformationUser {...userData} onChange={updateUserData} />
                    <SubscriptionButton {...userData} />
                </div>
                <div className="col-md-4 col-sm-9">
                    <h2>Preference</h2>
                    <PreferenceForm
                        language={userData.language ?? ''}
                        birthdate={userData.birthdate ?? ''}
                        author_id={userData.author_id }
                        source_id={userData.source_id }
                        category_id={userData.category_id }
                        onChange={(callback:any)=>{
                            const data  = {...userData,...callback}
                            updateUserData(data)
                        }}
                     />
                </div>
                <div className="col"></div>
            </div>
        </>
        
        
    );
}
export default UserPreference;