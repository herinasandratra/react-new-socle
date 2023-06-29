
import { useEffect, useState } from 'react';
import SubmitPassword from '../../components/login/submitButton';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, getUser } from '../../utils/cookies';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange =(event:any) =>{
    setEmail(() => event.target.value)
  }
  const handlePasswordChange =(event:any) =>{
    setPassword(() =>event.target.value)
  }
  const navigate = useNavigate()
   useEffect(()=>{
     if(getToken() && getUser()) navigate("/preference")
   })
    return (
      <div className="container">
        <div className='row mt-5'>
          <div className='col'>
            <div className='card col-5 mx-auto mt-5'>
              {/* <h2>Login</h2> */}
              <div className="card-header">
                Connexion
              </div>
              <div className='card-body' >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <SubmitPassword 
                  password={password}
                  login = {email}
                />
                <Link
                  to={"/subscribe"}
                >
                  Subscription
                </Link>
              </div>
            </div>
          </div>
          
        </div>
    </div>
  );
}
  
export default Login;