import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './style.css'
import Logout from "./Logout";
import './DisableRtclick'
//import Validation from "./Validation";

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
    const [validation, setValidation]=useState({course_name: "", course_year: "", course_term: "", course_credits: "", course_capacity: "", course_prerequisites: ""});
    const[errMessage, setErrMessage]=useState('');
    
    
    const[isSubmit, setIsSubmit]=useState(false);
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
        // eslint-disable-next-line
      },[]);

//===============================================================================================================================
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }
//===============================================================================================================================
const checkValidation = () => {
    let errors = {...validation};
    const course_yearRegex =  /^[1-5]$/
    const course_termRegex =  /^((1[0-2]|[1-9])|0[1-9])$/

    const course_year = formValues.course_year;
    const course_term = formValues.course_term;
    const course_name = formValues.course_name;
    const course_credits = formValues.course_credits;
    const course_capacity = formValues.course_capacity;

    if(!course_name){
        errors.course_name = "Course Name is required"
    } else { errors.course_name = "" }

    if(!course_credits){
        errors.course_credits = "Course Credits is required"
    } else { errors.course_credits = "" }

    if(!course_capacity){
        errors.course_capacity = "Course Capacity is required"
    } else { errors.course_capacity = "" }

    if(!course_year){
        errors.course_year = "Course Year is required"
    } else if(!(course_yearRegex.test(course_year))) { 
        errors.course_year = "Course Year allowed range [1-5]"
    } else { errors.course_year = "" }

    if(!course_term){
        errors.course_term = "Course Term is required"
    } else if(!(course_termRegex.test(course_term))) { 
        errors.course_term = "Course Term allowed range [1-12]"
    } else { errors.course_term = "" }

    if((errors.course_name 
        || errors.course_credits 
        || errors.course_capacity 
        || errors.course_year 
        || errors.course_term) ? setIsSubmit(false): setIsSubmit(true));
    
        setValidation(errors);
    }

useEffect(() => {
    checkValidation();
    // eslint-disable-next-line
  }, [formValues]);
//=====================================================================================================================
    const handlesubmit =  (e) => {
        e.preventDefault();
        if ((getuserArr && getuserArr.length)) {
        
            if(isSubmit){
                    try {
                        const response=  axios.put("http://localhost:8000/data/"+empid, formValues)
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
                    } else { alert ("Please correct the errors");}
        }
        else {navigate("/")}
    }

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
                                        <input name="course_name" required disabled={show1} value={formValues.course_name} onChange={(e) => handleChange(e)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Description</label>
                                        <input name="course_description" required disabled={show1} value={formValues.course_description} onChange={(e) => handleChange(e)} className="form-control"></input>
                                    </div>
                                </div>
                               
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Year</label>
                                        <input name="course_year" required disabled={show1} value={formValues.course_year} onChange={(e) => handleChange(e)} className="form-control"></input>
                                       </div>
                                       {!show1 && validation.course_year && <span className="text-danger">{validation.course_year}</span>}
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Term</label>
                                        <input name="course_term" required disabled={show1} value={formValues.course_term} onChange={(e) => handleChange(e)} className="form-control"></input>
                                    </div>
                                    {!show1 && validation.course_term && <span className="text-danger">{validation.course_term}</span>}
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Credits</label>
                                        <input name="course_credits" required disabled={show1} value={formValues.course_credits} onChange={(e) => handleChange(e)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Capacity</label>
                                        <input name="course_capacity" required disabled={show1} value={formValues.course_capacity} onChange={(e) => handleChange(e)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Course Prerequisites</label>
                                        <input name="course_prerequisites" disabled={show1} value={formValues.course_prerequisites} onChange={(e) => handleChange(e)} className="form-control"></input>
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