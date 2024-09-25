import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Cylsys.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3001/api/v1/sessions", { admin: { email, password } })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("authToken", response.data.auth_token);
          window.location.href = "/Company";
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError(true);
      });
  };

  return (
    <>
      <div className="" id="login-container">
        <div className="row pt-5 m-0">
          <div className="col-md-12 d-flex justify-content-center">
            <img src={logo} alt="" />
          </div>
          <div className="col-md-12">
            <div className="container d-flex justify-content-center" id="main1">
              <div className="card mt-4 " id="Card">
                <div className="card-body text-center">
                  <h3>Login</h3>
                  <hr />
                  <form className="text-center" onSubmit={handleLogin}>
                    <div className="d-flex justify-content-center mb-4 mt-5">
                      <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="input-group-text " id="Email">
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mb-4 mt-2">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="input-group-text" id="Password">
                        <i className="fas fa-lock"></i>
                      </div>
                    </div>
                    <div className="text-center">
                      <Link to="/forgetpassword" id="Forget">
                        Forget Password?
                      </Link>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-offset-10">
                        <button
                          className="btn btn-primary col-md-12"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="col-md-offset-10 mt-3">
                        <p>
                          Don't have an Account?
                          <Link to="/signup">Sign Up</Link>
                        </p>
                      </div>
                    </div>
                    {loginError && (
                      <p className="error-message">
                        Invalid email or password. Please try again.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
