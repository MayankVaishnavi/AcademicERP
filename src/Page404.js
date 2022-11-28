import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Page404() { 

    useEffect(()=> {
        localStorage.clear();
    },[])

    const navigate=useNavigate();
    const errorPage =() => {
        navigate("/");

    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
            <p className="lead">
                The page you’re looking for doesn’t exist.
              </p>
              <button className="btn btn-outline-primary" type="button" onClick={errorPage}>Back</button>
        </div>
    </div>
    );
  }
export default Page404;
