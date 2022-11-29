const Validation = (formValues)=> {
 
    const errors = {}
    const course_year =  /^[1-5]$/;
    const course_term =  /^((1[0-2]|[1-9])|0[1-9])$/;

    console.log(formValues.course_year, formValues.course_term);
    if(!course_year.test(formValues.course_year)) {
        errors.course_year = "Course Year allowed range [1-5]"
    }

    if(!course_term.test(formValues.course_term)) {
        errors.course_term = "Course Term allowed range [0-12]"
    }
    return errors;
}

export default Validation;