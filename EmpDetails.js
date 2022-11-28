import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetails = () => {
    const{empid}=useParams();
    const[empdata, empdatachange] = useState({});
    useEffect(()=>{
        axios.get("http://localhost:8000/data/"+empid)
        .then(res => {
            empdatachange(res.data);
        }).catch(err => {
            console.log(err.message);
        })
    },[]);

    return (
        <div>
            <div className="card" style={{"textAlign" : "left"}}>
                <div className="card-title">
                    <h2>Employee create</h2>
                </div>
                <div className="card-body"></div>
           {empdata && 
           <div> 
            <h2>Employee: <b>{empdata.name}</b></h2>
            <h3>Username: <b>{empdata.username}</b></h3>
            <h3>Email: <b>{empdata.email}</b></h3>
            <h3>Website: <b>{empdata.website}</b></h3>
            <Link className="btn btn-danger" to="/">Back</Link>
            </div>
            }
            </div>
        </div>
    );
}

export default EmpDetails;