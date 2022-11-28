const Validation = (formValues)=> {
 
    const errors = {}

    if(!formValues.course_year){
        errors.course_year = "Course Year is required"
    }
    else if(formValues.course_year < 1 || formValues.course_year > 5) {
        errors.course_year = "Course Year allowed range [1-5]"
    }
    return errors;
}


export default Validation;