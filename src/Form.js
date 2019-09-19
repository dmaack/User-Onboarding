import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
                    <Field component='select' className='role-select' name='role'>
                        <option>Please Select an Option</option>
                        <option value='student'>Student</option>
                        <option value='teamLead'>Team Lead</option>
                        <option value='instructor'>Instructor</option>
                    </Field>
                        {touched.role && errors.role && <p className='error'>{errors.role}</p>}   
                    <Field component='textarea' type='text' name='bio' placeholder='bio' /> 
                        {touched.bio && errors.bio && <p className='error'>{errors.bio}</p>}
                    <Field type="file" value='' name='image' />
                 <label className='checkbox-container'>
                    Terms of Service
                    <Field
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                    />
                    </label>
                    <button type='submit'>Submit</button>
            </Form>

                {users.map(user => (
                    <ul key={user.id}>
                        <li>UserName: {user.userName}</li>
                        <li>email: {user.email}</li>
                        <li>Password: {user.password}</li>
                        <li>Role: {user.role}</li>
                        <li>Bio: {user.bio}</li>
                        <li>Profile Image: {user.image}</li>
                    </ul>
      ))}

        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({ userName, email, password, role, terms, bio, image }) {
      return {
        terms: terms || false,
        userName: userName || '',
        email: email || '',
        password: password || '',
        role: role || '',
        bio: bio || '',
        image: image || '',
      };
    },
  
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('Please enter a userName'),
      email: Yup.string().required('Please enter an email'),
      password: Yup.string().required('Please enter a password'),
      role: Yup.string()
        .oneOf(['student', 'teamLead', 'instructor'])
        .required('Please select a role')
    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
          setStatus(res.data);
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm); 
  console.log('This is the HOC', FormikUserForm);
  export default FormikUserForm;