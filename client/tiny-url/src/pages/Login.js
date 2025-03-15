import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/authContext';


function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const[err,setError] = useState(null);
  
  const {login} = useContext(AuthContext);

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    }catch(err){
      setError(err)
      console.log(err);
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input placeholder='username' type='text' name='username' required onChange={handleChange} />
        <input placeholder='password' type='password' name='password' required onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {/* {err && <p>{err}</p>} */}
        <span>Don't you have an account? <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login
