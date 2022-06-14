import React, {useState} from 'react';
import {ContainerStyle, MarginTopFromHeaderStyle} from "../styles/General.styled";
import * as yup from "yup";
import {ErrorMessage, Form, Formik, Field} from "formik";
import {
    LoginButtonStyle,
    LoginFormStyle,
    LoginInputBlockStyle,
    LoginLabelStyle,
    LoginTitleStyle
} from "../styles/Login.styled";
import {Link} from "react-router-dom";
import {loginUser} from "../api/api";
import {loggedInKey} from "../constants/constants";
import {useDispatch} from "react-redux";
import {setAccess} from "../redux/accessSlice";


function Login() {

    const dispatch = useDispatch();
    const [buttonActive, setButtonActive] = useState(true);

    function reRenderRouting(data){
        localStorage.setItem(loggedInKey, data.loggedInValue);
        dispatch(setAccess(true));
    }

    function onSubmitLogin(username, password) {
        setButtonActive(false);
        loginUser(username, password).then((data) => {
            if (data.loggedInValue) {
                setButtonActive(true);
                reRenderRouting(data);
            } else {
                alert('username or password is incorrect!')
                setButtonActive(true);
            }
        });
    }

    return (
        <MarginTopFromHeaderStyle>
            <ContainerStyle>

                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={yup.object({
                        username: yup
                            .string()
                            .required('username is required')
                            .max(89, 'At most eighty nine characters'),
                        password: yup
                            .string()
                            .required('Password is required')
                            .min(8, 'At least eight characters')
                            .max(44, 'At most forty four characters')
                    })}

                    onSubmit={(values) => {
                        onSubmitLogin(values.username, values.password);

                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          isValid, handleSubmit, dirty
                      }) => {
                        return (
                            <Form>
                                <LoginFormStyle>

                                    <LoginTitleStyle>Login</LoginTitleStyle>

                                    <LoginInputBlockStyle>
                                    <LoginLabelStyle htmlFor="username">Username</LoginLabelStyle>
                                        <Field
                                            type={'text'}
                                            name={'username'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter your username'
                                            value={values.username}/>
                                        {touched.username && errors.username
                                        && <ErrorMessage name='username'>{error => <Error>{error}</Error>}</ErrorMessage>
                                        }
                                    </LoginInputBlockStyle>

                                    <LoginInputBlockStyle>
                                        <LoginLabelStyle htmlFor="password">Password</LoginLabelStyle>
                                        <Field
                                            type={'password'}
                                            name={'password'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter your password'
                                            value={values.password}/>
                                        {touched.password && errors.password
                                        &&
                                        <ErrorMessage name='password'>{error => <Error>{error}</Error>}</ErrorMessage>
                                        }
                                    </LoginInputBlockStyle>

                                    <p>Not a member? <Link to="/register">Sign up</Link></p>

                                    {buttonActive
                                        ? (
                                            <LoginButtonStyle
                                                disabled={!isValid && !dirty}
                                                onClick={handleSubmit}
                                                type='submit'
                                                variant="outline-info">
                                                Login me</LoginButtonStyle>
                                        ) : (
                                            <LoginButtonStyle
                                                disabled={true}
                                                onClick={handleSubmit}
                                                type='submit'
                                                variant="outline-info">
                                                Login me</LoginButtonStyle>
                                        )}

                                </LoginFormStyle>
                            </Form>)
                    }}

                </Formik>


            </ContainerStyle>
        </MarginTopFromHeaderStyle>
    );

}

export default Login;