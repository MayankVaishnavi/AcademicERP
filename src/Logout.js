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
         <div style={{"float":"right"}}>
            <button className="btn btn-outline-danger" onClick={handleClick}>Logout</button>
            </div>
        </>
    )
}
export default Logout;