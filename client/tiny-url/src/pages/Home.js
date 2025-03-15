import React,{ useContext, useEffect, useState } from 'react'
import background_1 from '../img/background_1.png'
import { AuthContext } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Home() {

  const { currentUser } = useContext(AuthContext);

  const [url,setUrl] = useState({
    originalURL:"",
    shortenURL: ""
  });

  const navigate = useNavigate();
  useEffect(()=>{
    if (currentUser === null){
      navigate('/login')
    }
  })

  const handleChange = (e)=>{
    setUrl((prev)=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:8800/api/shorten",url,{withCredentials:true});
      setUrl((prev)=>({...prev,shortenURL:res.data.shortenURL}));
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='home'>
      <div className="part1">
        <h1 style={{color: "white"}}>Build stronger digital connections</h1>
        <h4 style={{color:"white"}}>Use our URL shortener, QR Codes and landing pages to engage your audience and connect them to the right<br />
        information. Build, edit, and track everything inside the Bitly connections platform</h4>
        <form>
          <h1>Shorten a long link</h1>
          <p>No credit card required</p>
          <h4>Paste your long link here</h4>
          <input required placeholder='https://example.com/my-long-url' name="originalURL" onChange={handleChange}></input>
          <button onClick={handleSubmit}>Get your link!!</button>
          {url.shortenURL && <p>Your shortened URL: "<Link to={url.shortenURL} target='_blank' style={{textDecoration:"none",color:'black',fontSize:'20px'}}>{url.shortenURL}"</Link></p>}
        </form>
        <h4 style={{color:"white",padding:"20px"}}>Sign up for free</h4>
      </div>
      <div className="part2">
        Hello World
      </div>
    </div>
  )
}

export default Home
