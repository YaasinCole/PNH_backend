// pages/login.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/signupstyle.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const MarkerPage: React.FC = () => {

    const [title, setTitle] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setLongitude] = useState('');


    const router = useRouter();
    const addLocation = () => {
        axios.post("http://127.0.0.1:8080/addlocation", {
            title: title,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            email: email,
            latitude: latitude,
            longitude: longitude
        })
            .then(function (response) {
                if (response.status === 200) {
                    // Redirect to the map page
                    router.push('/map');
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
            <section className={`vh-200 ${styles['gradient-custom']}`}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: 1 }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Marker</h2>
                                        <p className="text-white-50 mb-5">Add a Marker</p>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="title" value={title} onChange={(t) => setTitle(t.target.value)} id="title" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="title">Title</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="firstName" value={firstname} onChange={(f) => setFirstName(f.target.value)} id="firstName" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="firstName">first name</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="lastName" value={lastname} onChange={(l) => setLastName(l.target.value)} id="lastName" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="lastName">last Name</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="phoneNumber" value={phonenumber} onChange={(p) => setPhoneNumber(p.target.value)} id="phoneNumber" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="phoneNumber">Phone number</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="typeEmailX" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="latitude" value={latitude} onChange={(la) => setlatitude(la.target.value)} id="latitude" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="latitude">Latitude X coordinate</label>
                                        </div>

                                        <div className={'form-outline form-white mb-4'}>
                                            <input type="longitude" value={longitude} onChange={(lo) => setLongitude(lo.target.value)} id="longitude" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="Role">Longitude Y coordinate</label>
                                        </div>


                                        <button className="btn btn-outline-light btn-lg px-5" onClick={() => addLocation()} type="submit">Add</button>

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

export default MarkerPage;