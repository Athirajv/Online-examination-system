

import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import'react-toastify/dist/ReactToastify.css'


function AdminLogin() {
    const [email, setEmail] = useState('');
        
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {


        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4002/', {
                method: 'POST',


                
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            
            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    localStorage.setItem('username',data.username)
                    toast.success('Login successful',{
                        position:'top-right',
                        autoClose:1000,
                        onClose:()=>{
                            switch (data.redirect) {
                                case '/adminhome':
                                    navigate('/adminhome');
                                    break;
                                case '/teacherhome':
                                    navigate('/teacherhome');
                                    break;
                                case '/studenthome':
                                    navigate('/studenthome');
                                    break;
                                default:
                                    setErrorMessage('Invalid user status');
                            }
                        }
                    })
                  
                } else {
                    setErrorMessage('Invalid email or password');
                }
            } else {
                setErrorMessage('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Login failed');
        }
    };

    const containerStyle = {
        backgroundImage: `url(img/hd.avif)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    return (
        <>
            <div className="container-fluid" style={containerStyle}>
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <a href="index.html" className="">
                                    <h3 className="text-secondary"><i className="fa  me-2"></i>Admin</h3>
                                </a>
                                <h3 className="text-secondary">Sign In</h3>
                            </div>
                            <form action="" method="post">
                                <div className="form-floating mb-3">
                                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                
                                <div className="form-floating mb-4">
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                    </div>
                                    <a href="">Forgot Password</a>
                                </div>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <button type="submit" className="btn btn-secondary py-3 w-100 mb-4" onClick={handleSubmit}>Sign In</button>
                                <p className="text-center mb-0">Don't have an Account? <a href="/adminsignup">Sign Up</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default AdminLogin;
