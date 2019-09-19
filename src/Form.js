import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({errors, touched, values, status}) => {
    const [ users, setUsers ] = useState( [] );
    useEffect(() => {
        if (status) {
            setUsers([status]);
        }
    }, [status]);

    return (
        <div className='user-form'>
            <h1>New User Form</h1>
            <Form>
                <Field type='text' name='userName' placeholder='userName' />
                {touched.userName && errors.userName && (
                    <p className='error'>{errors.userName}</p>
                )}
                <Field type='text' name='email' placeholder='email' />
                {touched.email && errors.email && (
                    <p className='error'>{errors.email}</p>
                )}
                <Field type='text' name='password' placeholder='password' />
                {touched.password && errors.password && (
                    <p className='error'>{errors.password}</p>
                )}
                 <label className="checkbox-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                    </label>
                    <button type="submit">Submit!</button>
            </Form>

                {users.map(user => (
                    <ul key={user.id}>
                        <li>UserName: {user.userName}</li>
                        <li>email: {user.email}</li>
                        <li>Password: {user.password}</li>
                    </ul>
      ))}

        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({ userName, email, password, terms }) {
      return {
        terms: terms || false,
        userName: userName || "",
        email: email || "",
        password: password || "",
      };
    },
  
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Please enter a userName"),
      email: Yup.string().required("Please enter an email"),
      password: Yup.string("Please enter a password"),
    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm); 
  console.log("This is the HOC", FormikUserForm);
  export default FormikUserForm;