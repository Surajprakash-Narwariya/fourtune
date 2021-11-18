import React, { useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logIn, useAuth } from '../../funct/firebaseConfig';
import '../style.css';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const currentUser = useAuth();

    const handleLogin = async () => {
        try {
            await logIn(emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            alert(err.message);
        }
    };

    // const handleLogin = async () => {
    //     try {
    //         await signWithLink(emailRef.current.value);
    //     } catch (err) {
    //         alert(err);
    //     }
    // };

    if (currentUser) {
        return (
            <h1>
                Successfully signed in <Redirect to='/direction-page' />
            </h1>
        );
    }
    return (
        <div>
            <div className='d-lg-flex justify-content-center loginForm'>
                <div>
                    <div className='d-lg-flex justify-content-center headingSpace'>
                        <h1>Login</h1>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email address</label>
                        <input
                            type='email'
                            className='form-control'
                            ref={emailRef}
                            aria-describedby='emailHelp'
                        />
                        <div id='emailHelp' className='form-text'>
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            ref={passwordRef}
                        />
                    </div>

                    <button onClick={handleLogin} className='btn btn-primary'>
                        Submit
                    </button>
                    <span style={{ marginLeft: '35px' }}>
                        New here?
                        <Link style={{ marginLeft: '10px' }} to='/signup'>
                            Sign Up
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Login;
