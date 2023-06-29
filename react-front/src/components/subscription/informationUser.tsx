import { useState } from "react";
import { userDataType } from "../../pages/subscription/subscription";
import { userDataAttr } from "../../pages/subscription/userDataAttr";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

type informationHandler = {
    onChange:(updatedUserData: userDataType) =>void 
}
function InformationUser(props: userDataType & informationHandler){
    const [userData, setUserData] = useState<userDataType>({
        surname:props.surname,
        name:props.name,
        address: props.address,
        email: props.email,
        zip: props.zip,
        city: props.city,
        password: props.password,
        remember_password: props.remember_password,
        language: props.language,
        id:props?.id
    })
    const updateUserData = (event:any,inputName:userDataAttr) =>
    {
        const {onChange} = props
        let updatedData = userData;
        switch(inputName){
            case userDataAttr.email:
                updatedData = { ...userData, [inputName]: event.target.value.toLowerCase() };
                setUserData(() => updatedData);
                break;
            case userDataAttr.password:
                updatedData = { ...userData, [inputName]: event.target.value };
                setUserData(() => updatedData);
                break;
            case userDataAttr.remember_password:
                updatedData = { ...userData, [inputName]: event.target.value };
                setUserData(() => updatedData);
                break;
            default:
                updatedData = { ...userData, [inputName]: capitalizeFirstLetter(event.target.value) };
                setUserData(() => updatedData);
                break
        }
        onChange(updatedData)
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="firstname" 
                            placeholder="Julia" 
                            value={userData?.surname}
                            onChange={(e:any) => updateUserData(e,userDataAttr.surname)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="lastname" 
                            placeholder="Osborn"
                            value={userData?.name} 
                            onChange={(e:any) => updateUserData(e,userDataAttr.name)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="address" 
                            placeholder="1234 Main St"
                            value={userData?.address}  
                            onChange={(e:any) => updateUserData(e,userDataAttr.address)}
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="city"
                                value={userData?.city} 
                                onChange={(e:any) => updateUserData(e,userDataAttr.city)}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="zip">Zip</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="zip" 
                                value={userData?.zip} 
                                onChange={(e:any) => updateUserData(e,userDataAttr.zip)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Email" 
                                value={userData?.email} 
                                onChange={(e:any) => updateUserData(e,userDataAttr.email)}
                            />
                        </div>
                        {userData.id ?'' :(<><div className="form-group ">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="form-control"
                                id="password"
                                placeholder="Password" 
                                value={userData?.password} 
                                onChange={(e:any) => updateUserData(e,userDataAttr.password)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="remember-password">Repeat password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="remember-password" 
                                placeholder="Password" 
                                value={userData?.remember_password} 
                                onChange={(e:any) => updateUserData(e,userDataAttr.remember_password)}
                            />
                        </div></>)}
                    </div> 
                </div>
            </div>
        </>
    );
}

export default InformationUser;