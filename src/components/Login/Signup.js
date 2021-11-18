import React, { useRef } from 'react';
import { signup, useAuth } from '../../funct/firebaseConfig';
import { Redirect } from 'react-router-dom';

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const user = useAuth();

    const handleSignUp = async () => {
        if (passwordRef.current.value === confirmPasswordRef.current.value) {
            try {
                await signup(emailRef.current.value, passwordRef.current.value);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert('Password did not match');
        }
    };

    if (user) {
        return (
            <h1>
                Successfully signed in <Redirect to='/direction-page' />
            </h1>
        );
    }

    return (
        <div className='d-lg-flex justify-content-center loginForm'>
            <div>
                <div className='d-lg-flex justify-content-center headingSpace'>
                    <h1>Sign Up</h1>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Email address</label>
                    <input
                        ref={emailRef}
                        type='email'
                        className='form-control'
                        aria-describedby='emailHelp'
                    />
                    <div id='emailHelp' className='form-text'>
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        ref={passwordRef}
                        type='password'
                        className='form-control'
                        id='exampleInputPassword1'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Confirm Password</label>
                    <input
                        ref={confirmPasswordRef}
                        type='password'
                        className='form-control'
                        id='exampleInputPassword1'
                    />
                </div>

                <button onClick={handleSignUp} class='btn btn-primary'>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default SignUp;
