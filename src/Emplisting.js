import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import './style.css'
import Logout from "./Logout";


const Emplisting = () => {
    const[empdata, empdatachange] = useState([]);
    const navigate=useNavigate();

    const getcourses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/data/");
            empdatachange(response.data);
        } catch (error) {
            console.log(error);
        }
      };

            
      useEffect(() => {
        const getuserArr=window.localStorage.getItem("user")
        if ((getuserArr && getuserArr.length)) {
        getcourses();
        } else {navigate("/")}
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
            }).catch(err => {
               console.log(err.message);
           });
        }
    }

    return (
       <div className="container h-100 d-inline-block">
        {<Logout/>}
            <div className="card" style={{"textAlign": "left"}}>
                <div className="card-title p-3 mb-2 bg-info text-dark">
                    <h2>Course Listing</h2>
                </div>
                <div className="card-body">
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
                                        <td>{item.course_prerequisites}</td>
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
        )
    
}


export default Emplisting;	