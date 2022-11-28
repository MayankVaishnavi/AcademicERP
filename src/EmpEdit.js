import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './style.css'
import Logout from "./Logout";

const EmpEdit = () => {
    const[show1, setShow1]=useState(true);
    const[show2, setShow2]=useState(false);
    const getuserArr=window.localStorage.getItem("user")

    const navigate=useNavigate();
    const{empid}=useParams();


    useEffect(()=>{
                axios.get("http://localhost:8000/data/"+empid)
                .then(res => {
                    course_idchange(res.data.id);
                    course_codechange(res.data.course_code);
                    course_namechange(res.data.course_name);
                    course_descriptionchange(res.data.course_description);
                    course_yearchange(res.data.course_year);
                    course_termchange(res.data.course_term);
                    course_creditschange(res.data.course_credits);
                    course_capacitychange(res.data.course_capacity);
                    course_prerequisiteschange(res.data.course_prerequisites);
                }).catch((err) => {err.response.status === 404 ? navigate("*") : console.log(err.message);} )
                if (!(getuserArr && getuserArr.length)) {navigate("/")}
    },[empid,navigate]);


    const[id,course_idchange]=useState("");
    const[course_code,course_codechange]=useState("");
    const[course_name,course_namechange]=useState("");
    const[course_description,course_descriptionchange]=useState("");
    const[course_year,course_yearchange]=useState("");
    const[course_term,course_termchange]=useState("");
    const[course_credits,course_creditschange]=useState("");
    const[course_capacity,course_capacitychange]=useState("");
    const[course_prerequisites,course_prerequisiteschange]=useState("");
    const[validation,valchange]=useState(false);

    const handlesubmit=(e)=> {
        e.preventDefault();
        if (!(getuserArr && getuserArr.length)) {
        const empdata={id,course_code,course_name,course_description,course_year,course_term,course_credits,course_capacity,course_prerequisites};
        axios.put("http://localhost:8000/data/"+empid, empdata)
             .then(res => {
                alert("Changes saved successfully");
                navigate("/course");
             }).catch(err => {
                console.log(err.message);
            });
        } else {navigate("/")}
    }

    const handleclick=()=>{
        setShow1(false);
        setShow2(true);
    }
    return (
        <div className="row">
            {<Logout/>}
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card" style={{"textAlign": "left"}}>
                        <div className="card-title p-3 mb-2 bg-info text-dark">
                            <h3>Course View/Edit Details</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course ID</label>
                                        <input value={id} disabled="disaled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Code</label>
                                        <input required disabled={show1} value={course_code} onMouseDown={e=> valchange(true)} onChange={e=> course_codechange(e.target.value)} className="form-control"></input>
                                        {course_code.length === 0 && validation &&<span className="text-danger">Enter the course code</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Name</label>
                                        <input disabled={show1} value={course_name} onChange={e=> course_namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Description</label>
                                        <input disabled={show1} value={course_description} onChange={e=> course_descriptionchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Year</label>
                                        <input disabled={show1} value={course_year} onChange={e=> course_yearchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Term</label>
                                        <input disabled={show1} value={course_term} onChange={e=> course_termchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Credits</label>
                                        <input disabled={show1} value={course_credits} onChange={e=> course_creditschange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Capacity</label>
                                        <input disabled={show1} value={course_capacity} onChange={e=> course_capacitychange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Prerequisites</label>
                                        <input disabled={show1} value={course_prerequisites} onChange={e=> course_prerequisiteschange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button disabled={show1} className="btn btn-outline-success" type="submit">Save Changes</button>
                                        <button disabled={show2} className="btn btn-outline-primary" type="button" onClick={handleclick}>Modify</button>
                                        <Link to="/course" className="btn btn-outline-danger">Back</Link>     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmpEdit;