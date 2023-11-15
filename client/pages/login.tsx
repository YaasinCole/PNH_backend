// pages/login.tsx
import React, { useState } from 'react';
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../styles/loginstyle.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const loginUser = () => {
        if (email.length == 0) {
            alert("Email has not been filled in");
        }
        else if (password.length == 0) {
            alert("password has not been filled in")
        } else {
            axios.post('http://127.0.0.1:8080/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    if (response.status === 200) {
                        // Redirect to the map page
                        router.push('/map');
                    }
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response?.status == 401) {
                        alert("inavlid credentials");
                    }
                });
        }
    }
    return (
        <div>
            <section className={`vh-100 ${styles['gradient-custom']}`}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: 1 }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="typeEmailX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="password" value={password} onChange={(p) => setPassword(p.target.value)} id="typePasswordX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>

                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                        <button className="btn btn-outline-light btn-lg px-5" onClick={loginUser} type="submit">Login</button>

                                    </div>

                                    <div>
                                        <p className="mb-0">Dont have an account? <Link href="/signup" className="text-white-50 fw-bold">Sign Up </Link>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;