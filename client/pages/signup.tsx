// pages/login.tsx
import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../styles/signupstyle.module.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const SignUpPage: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');

    const router = useRouter();

    const registerUser = () => {
        axios.post("http://127.0.0.1:8080/signup", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: role
        })
            .then(function (response) {
                if (response.status === 200) {
                    // Redirect to the map page
                    router.push('/login');
                }
            })
            .catch(function (error) {
                console.log(error, "error");

                if (error.response.status == 401) {
                    alert("Invalid information")
                }
            });
    };

    return (
        <div>
            <section className={`vh-100 ${styles['gradient-custom']}`}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: 1 }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                                        <p className="text-white-50 mb-5">Please register with us!</p>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="firstName" value={firstName} onChange={(f) => setFirstname(f.target.value)} id="firstName" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="firstName">First Name</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="lastName" value={lastName} onChange={(l) => setLastName(l.target.value)} id="lastName" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="lastName">Last Name</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="role" value={role} onChange={(r) => setRole(r.target.value)} id="Role" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="Role">Role</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="typeEmailX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="password" value={password} onChange={(p) => setPassword(p.target.value)} id="typePasswordX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" onClick={() => registerUser()} type="submit">Register</button>

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

export default SignUpPage;