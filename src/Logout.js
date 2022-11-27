import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate=useNavigate();

    const handleClick=()=>{
        localStorage.clear();
        navigate("/", { replace: true });
    }
    
    return (
        <>
            <button onClick={handleClick}>Logout</button>
        </>
    )
}
export default Logout;