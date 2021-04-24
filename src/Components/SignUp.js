import React from 'react'
import './SignUp.css'
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom';
import axios from 'axios'





const SignUp = (props) => {
    const history = useHistory();
    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', emailId: '', dateOfBirth: '2017-05-24', gender: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)

                // post data
                axios.post('http://localhost:3003/api/signup', values)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            alert('SignUp Sucess');
                            history.push('/Home')
                            window.location.reload();
                            setSubmitting(false);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })


            }}

            // validationSchema
            validationSchema={Yup.object().shape({
                firstName: Yup.string()
                    .required('Enter First Name'),

                lastName: Yup.string()
                    .required('Enter Last Name'),

                emailId: Yup.string()
                    .email()
                    .required("Enter Email Id"),

                dateOfBirth: Yup.string()
                    .required("Select Date Of Birth "),

                gender: Yup.string()
                    .required("Enter Gender ")
                    .matches(/(?:male|Male|female|Female)/, 'Enter Valid Gender'),

                password: Yup.string()
                    .required('Enter Password')
                    .min(8, "password is too short - should be eight charcters long")
                    .matches(/(?=.*[0-9])/, 'password should contain number'),

            })}
        >
            {({

                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (






                <div>
                    {/* form */}
                    <form className='form' onSubmit={handleSubmit}>
                        <LockOutlinedIcon className='signup-icon' />
                        <h1>SignUp</h1>

                        {/* first name and last name */}
                        <div className='flname'>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.firstName}
                                        className={errors.firstName && touched.firstName && 'error'}
                                        helperText={errors.firstName && touched.firstName && errors.firstName}
                                        value={values.firstName} onChange={handleChange} onBlur={handleBlur} id='firstName' label="First Name*" variant="outlined" />
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        error={errors.lastName && touched.lastName}
                                        className={errors.lastName && touched.lastName && 'error'}
                                        id="lastName" helperText={errors.lastName && touched.lastName && errors.firstName}
                                        value={values.lastName} onChange={handleChange} onBlur={handleBlur} label="Last Name*" variant="outlined" />
                                </Grid>
                            </Grid>
                        </div>

                        {/* email id */}
                        <div className='emailpass'>
                            <Grid item xs={12}  >
                                <TextField
                                    error={errors.emailId && touched.emailId}
                                    id="emailId" className={errors.emailId && touched.emailId && 'error'}
                                    helperText={errors.emailId && touched.emailId && errors.emailId}
                                    value={values.emailId} onChange={handleChange} onBlur={handleBlur} className='email' label="Email Id*" variant="outlined" />
                            </Grid>
                        </div>

                        {/* date of birth and gender */}
                        <div className='dobgender'>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="dateOfBirth" label="Date of Birth*" type='date' className={errors.dateOfBirth && touched.dateOfBirth && 'error'} value={values.dateOfBirth} onChange={handleChange} onBlur={handleBlur} variant="outlined" />
                                    {errors.dateOfBirth && touched.dateOfBirth && errors.dateOfBirth}
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        error={errors.gender && touched.gender}
                                        id="gender" className={errors.gender && touched.gender && 'error'}
                                        helperText={errors.gender && touched.gender && errors.gender}
                                        value={values.gender} onChange={handleChange} onBlur={handleBlur} label="gender*" variant="outlined" />
                                </Grid>
                            </Grid>
                        </div>

                        {/* password */}
                        <div className='emailpass'>
                            <Grid item xs={12}  >
                                <TextField
                                    error={errors.password && touched.password}
                                    id="password" type='password' className={errors.password && touched.password && 'error'}
                                    helperText={errors.password && touched.password && errors.password}
                                    value={values.password} onChange={handleChange} onBlur={handleBlur} className='email' label="Password*" variant="outlined" />
                            </Grid>
                        </div>

                        {/* submit button */}
                        <div className='btn'>
                            <Button type='submit' variant="contained" disabled={isSubmitting} color="primary" >
                                Submit
                     </Button>
                        </div>

                    </form>
                </div>
            )}
        </Formik>
    )
}
export default SignUp