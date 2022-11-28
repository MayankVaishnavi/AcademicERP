import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './style.css'
import Logout from "./Logout";
import './DisableRtclick'
import Validation from "./Validation";

const EmpEdit = () => {
    const initialValues= {
        id: "",
        course_code: "",
        course_name: "",
        course_description: "",
        course_year: "",
        course_term: "",
        course_credits: "",
        course_capacity: "",
        course_prerequisites: ""
    }
    const[formValues, setFormValues]=useState(initialValues)

    const[formErrors, setFormErrors]=useState({});
    const[errMessage, setErrMessage]=useState('');
    
    // const[isSubmit, setIsSubmit]=useState(false);
    const[show1, setShow1]=useState(true);
    const[show2, setShow2]=useState(false);
    const getuserArr=window.localStorage.getItem("user")
    const navigate=useNavigate();
    const{empid}=useParams();

    const getcourses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/data/"+empid);
            setFormValues(response.data);
        } catch(err) {
            if(!err?.response){
             setErrMessage('No server response');
            } else if (err.response?.status === 404){
                navigate("*")
            }
            else {
             setErrMessage('Saved changes failed');
            }
        }
      };

      useEffect(() => {
        const getuserArr=window.localStorage.getItem("user")
        if ((getuserArr && getuserArr.length)) {
        getcourses();
        } else {navigate("/")}
      },[navigate]);

//===============================================================================================================================
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }
//===============================================================================================================================

    const handlesubmit = async (e) => {
        e.preventDefault();
        if ((getuserArr && getuserArr.length)) {
            setFormErrors(Validation(formValues));  
        try {
               const response= await axios.put("http://localhost:8000/data/"+empid, formValues)
                alert("Changes saved successfully", response);
                navigate("/course");
             } catch(err) {
                    if(!err?.response){
                     setErrMessage('No server response');
                    } else if (err.response?.status === 404){
                        navigate("*")
                    }
                    else {
                     setErrMessage('Saved changes failed');
                    }
            }
        } 
        else {navigate("/")}
    }

// useEffect(() => {
// if (Object.keys(formErrors).length === 0 && isSubmit)

// },[]);
//==============================================================================================================================
    const handleclick=()=>{
        const getuserArr=window.localStorage.getItem("user")
        if ((getuserArr && getuserArr.length)) {
        setShow1(false);
        setShow2(true);
    } else {navigate("/")}
    }
//==============================================================================================================================
    return (
        <>
        <div className="row">
        <p className={errMessage ? "card-body bg-danger text-white errmsg": "offscreen"} aria-live="assertive">{errMessage}</p>
            <div className="offset-lg-3 col-lg-6">
            {<Logout/>}
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
                                        <input name="id" value={formValues.id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Code</label>
                                        <input name="course_code" required disabled="disabled" value={formValues.course_code} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Name</label>
                                        <input name="course_name" required disabled={show1} value={formValues.course_name} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Description</label>
                                        <input name="course_description" required disabled={show1} value={formValues.course_description} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Year</label>
                                        <input name="course_year" required disabled={show1} value={formValues.course_year} onChange={handleChange} className="form-control"></input>
                                       </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Term</label>
                                        <input name="course_term" required disabled={show1} value={formValues.course_term} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Credits</label>
                                        <input name="course_credits" required disabled={show1} value={formValues.course_credits} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Capacity</label>
                                        <input name="course_capacity" required disabled={show1} value={formValues.course_capacity} onChange={handleChange} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Prerequisites</label>
                                        <input name="course_prerequisites" disabled={show1} value={formValues.course_prerequisites} onChange={handleChange} className="form-control"></input>
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
        </>
    );
}

export default EmpEdit;