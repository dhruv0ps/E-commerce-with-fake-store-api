import React, { useState } from 'react';
import model from './img11.webp';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  const {productId} = useParams();
  const navigate = useNavigate();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        axios
            .post(`https://fakestoreapi.com/auth/login`, { username, password })
            .then((res) => {
                console.log(res);
                const token = res.data.token; // Assuming your backend returns a token
                localStorage.setItem('token', token); 
               navigate(`/carting/${productId}`)
            })
            .catch((err) => {
                console.error(err);
                toast.error("Username or password is incorrect");
            });
    };

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: '' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src={model}
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: "1rem 0 0 1rem" }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i
                                                        className="fas fa-cubes fa-2x me-3"
                                                        style={{ color: "#ff6219" }}
                                                    />
                                                    <span className="h1 fw-bold mb-0">Logo</span>
                                                </div>
                                                <h5
                                                    className="fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: 1 }}
                                                >
                                                    Sign into your account
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        placeholder='Username'
                                                        value={username}
                                                        onChange={handleUsernameChange}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example17">
                                                        Username
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        placeholder='password'
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example27">
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="button"
                                                        onClick={handleSubmit}
                                                    >
                                                        Login
                                                    </button>
                                                    <ToastContainer />
                                                </div>
                                                <a className="small text-muted" href="#!">
                                                    Forgot password?
                                                </a>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                    Don't have an account?{" "}
                                                    <a href="#!" style={{ color: "#393f81" }}>
                                                        Register here
                                                    </a>
                                                </p>
                                                <a href="#!" className="small text-muted">
                                                    Terms of use.
                                                </a>
                                                <a href="#!" className="small text-muted">
                                                    Privacy policy
                                                </a>
                                            </form>
                                        </div>
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

export default Login;
