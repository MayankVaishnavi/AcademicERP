import { useState } from "react";
import './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate();

//=====================================================================
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


//=====================================================================
  const handleApi = () => {
    axios.post('https://reqres.in/api/login', {
      email: email,
      password: password
    }).then(result => {
        window.localStorage.setItem("emailData",JSON.stringify(email))
        window.localStorage.setItem("passwordData",JSON.stringify(password))
        alert('success');
        navigate("/course");
    })
      .catch(error => {
        alert(error.response);
        console.log(error);
      })
  }

//=====================================================================

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