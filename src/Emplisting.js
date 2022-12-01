import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import './style.css'
import Logout from "./Logout";
import Loading from "./Loading";
import './Loading.css'

const Emplisting = () => {
    const[empdata, empdatachange] = useState([]);
    const[errMessage, setErrMessage]=useState('');
    const[loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const getcourses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/data/");
            empdatachange(response.data);
            setLoading(true);
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
      },[navigate]);

      
    const LoadEdit=(id) => {
        navigate("/employee/edit/"+id);
    }

    const Removefunction=(id) => {
        if(window.confirm('Do you want to remove the employee ?')){
            axios.delete("http://localhost:8000/data/"+id)
            .then(res => {
               alert("Removed successfully");
               window.location.reload();
               setLoading(true);
            }).catch(err => {
               console.log(err.message);
           });
        }
    }

    return (
        <>
        <p className={errMessage ? "card-body bg-danger text-white errmsg": "offscreen"} aria-live="assertive">{errMessage}</p> 
       { loading ?
       <div className="container h-100 d-inline-block">
        {<Logout/>}
            <div className="card" style={{"textAlign": "left"}}>
                <div className="card-title p-3 mb-2 bg-info text-dark">
                    <h2>Course Listing</h2>
                </div>
                <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="text-white">
                            <tr>
                                <td>Course ID</td>
                                <td>Course Code</td>
                                <td>Course Name</td>
                                <td>Course Description</td>
                                <td>Course Year</td>
                                <td>Course Term</td>
                                <td>Course Credits</td>
                                <td>Course Capacity</td>
                                <td>Course Prerequisites</td>
                                <td>Faculty</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            
                              {empdata && 
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.course_code}</td>
                                        <td>{item.course_name}</td>
                                        <td>{item.course_description}</td>
                                        <td>{item.course_year}</td>
                                        <td>{item.course_term}</td>
                                        <td>{item.course_credits}</td>
                                        <td>{item.course_capacity}</td>
                                        <td><ul>{item.course_prerequisites.split(',').map((items, i)=>(<li key={i}>{items}</li>))}</ul></td>
                                        <td>{item.course_faculty}</td>
                                        <td><button onClick={() => {LoadEdit(item.id)}} className="btn btn-outline-success">Edit</button>
                                        <button onClick={() => {Removefunction(item.id)}} className="btn btn-outline-danger">Remove</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div> : <Loading/> }
        </>
        )
    
}


export default Emplisting;	