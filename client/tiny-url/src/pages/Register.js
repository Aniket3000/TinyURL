import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  })

  const[err,setError] = useState(null);
  
  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('here')
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    }catch(err){
      setError(err.response.data)
      console.log(err);
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder='username' name='username' type='text' onChange={handleChange} required />
        <input placeholder='password' name='password' type='password' onChange={handleChange} required />
        <input placeholder='email' name='email' type='email' onChange={handleChange} required />
        <button type='submit'>Register</button>
        {err && <p>{err}</p>}
        <span>Do you have an account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
