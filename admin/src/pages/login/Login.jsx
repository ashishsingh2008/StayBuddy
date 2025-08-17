import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from 'react-icons/fa';

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post(
                "https://staybuddy-vm71.onrender.com/auth/login",
                credentials,
                { withCredentials: true }
            );
            localStorage.setItem("user", JSON.stringify(res.data || null));
            const us = JSON.parse(localStorage.getItem("user"));

            if (res.data.isAdmin) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                navigate("/");
            } else {
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: { message: "You are not allowed!" },
                });
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-box">
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Please login to your account</p>
                    
                    <form className="login-form" onSubmit={handleClick}>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                className="login-input"
                            />
                        </div>
                        
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                className="login-input"
                            />
                        </div>

                        <div className="form-footer">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="login-button"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        
                        {error && <div className="error-message">{error.message}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};
