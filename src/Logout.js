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
            <button className="btn btn-outline-danger" onClick={handleClick}>Logout</button>
        </>
    )
}
export default Logout;