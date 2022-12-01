import { useState } from "react";
import './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './DisableRtclick'
import Loading from "./Loading";
import './Loading.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[loading, setLoading]=useState(false);  
  const navigate=useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleApi = async (event) => {
    event.preventDefault()
    try {
      const response  = await  axios.post('https://reqres.in/api/login', {
        email: email,
        password: password
      })
      window.localStorage.setItem("user",JSON.stringify(response.data))
      setEmail('')
      setPassword('')
      alert('success')
      navigate('/course')
    }
      catch(exception) {
        alert("service error");
        console.log(exception)
      }
  }


  return (
    <div>
    {
    <div className="App">
      Email : <input value={email} onChange={handleEmail} type="text" /> <br />
      Password : <input value={password} onChange={handlePassword} type="text" /> <br />
      <button onClick={handleApi} >Login</button>
    </div>
    }
    </div>
  );
}

export default Login;