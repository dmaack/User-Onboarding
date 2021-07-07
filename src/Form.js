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
            <h1>Create New Account</h1>
            <Form>
                <Field type='text' name='userName' placeholder='userName' className='field' />
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
                    <Field component='select' className='subscription-select' name='subscription'>
                        <option>Select subscription type </option>
                        <option value='veggies'>Fruit and Vegetables</option>
                        <option value='meat'>Meat Only</option>
                        <option value='combo'>Meat + Fruit and Vegetables</option>
                    </Field>
                        {touched.subscription && errors.subscription && <p className='error'>{errors.subscription}</p>}  
                    <Field component='select' className='method-select' name='method'>
                        <option>Select Method </option>
                        <option value='delivery'>Delivery</option>
                        <option value='pick-up'>Pick-up</option>
                    </Field>
                        {touched.method && errors.method && <p className='error'>{errors.method}</p>} 
                    <Field component='select' className='refer-select' name='refer'>
                        <option>Select referral type</option>
                        <option value='existingUser'>Another user</option>
                        <option value='instagram'>Instragram</option>
                        <option value='twitter'>Twitter</option>
                        <option value='web'>Website/Internet search</option>
                        <option value='other'>Other</option>
                    </Field>
                        {touched.refer && errors.refer && <p className='error'>{errors.refer}</p>}  
                    <Field component='textarea' type='text' name='instructions' placeholder='Special instructions' /> 
                        {touched.instructions && errors.instructions && <p className='error'>{errors.instructions}</p>}
                    <Field className='upload-image' type="file" value='' name='image'/>
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
            <footer>
                <h3>Happy Farm</h3>
                <p>1234 Eat good food lane</p>
                <p>Yummyville, Farmland</p>
            </footer>

                {users.map(user => (
                    <ul key={user.id}>
                        <li>UserName: {user.userName}</li>
                        <li>email: {user.email}</li>
                        <li>Password: {user.password}</li>
                        <li>Subscription: {user.subscription}</li>
                        <li>Method: {user.method}</li>
                        <li>How did you learn about us? </li>
                        <li>Special instructions: {user.instructions}</li>
                        <li>Profile Image: {user.image}</li>
                    </ul>
      ))}

        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({ userName, email, password, subscription, method, refer, terms, instructions, image }) {
      return {
        terms: terms || false,
        userName: userName || '',
        email: email || '',
        password: password || '',
        subscription: subscription || '',
        method: method || '',
        refer: refer || ',',
        instructions: instructions || '',
        image: image || '',
      };
    },
  
    validationSchema: Yup.object().shape({
        userName: Yup.string().required('Please enter a userName'),
        email: Yup.string().required('Please enter an email'),
        password: Yup.string().required('Please enter a password'),
        subscription: Yup.string()
            .oneOf(['veggies', 'meat', 'combo'])
            .required('Please select a subscription type'),
        method: Yup.string()
            .oneOf(['deivery', 'pick-up'])
            .required('Please select a subscription type'),
        refer: Yup.string()
            .oneOf(['existingUser', 'instagram', 'twitter', 'web', 'other'])
            .required('Please select referral type'),
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