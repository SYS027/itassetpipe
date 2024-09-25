import React, { useState } from "react";
import axios from "axios";
import logo from "../Assets/Cylsys.png";
import { Link, useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const signupEmail = " ";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let isValid = true;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is not valid.",
      }));
      isValid = false;
    } else if (email === signupEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email does not match the one used during signup.",
      }));
      isValid = false;
    }

    if (newPassword.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const data = {
      email: email,
      password: newPassword,
      confirm_password: confirmPassword,
    };

    axios
      .post("http://127.0.0.1:3001/api/v1/password_resets", data)
      .then((response) => {
        setResetMessage("Password reset successful!");
        navigate("/login");
      })
      .catch((error) => {
        setResetMessage("Email is not Registered.");
      });
  };

  return (
    <>
      <div className="container-fluid " id="forget-container">
        <div className="d-grid justify-content-center">
          <div className="mt-5  text-center">
            <img src={logo} alt="logo" id="Image" />
          </div>
          <div className="card mt-4 " id="Card">
            <div className="card-body text-center">
              <h4>Forget Your Password ?</h4>
              <hr />
              <form className="text-center" onSubmit={handleSubmit}>
                <div className=" ">
                  <div className="d-flex justify-content-center mb-3 mt-4">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="input-group-text " id=" Email">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                  {errors.email && (
                    <div className="text-danger mb-2">{errors.email}</div>
                  )}
                  <div className="d-flex justify-content-center mb-3 mt-4">
                    <input
                      type={showPassword1 ? "text" : "password"}
                      placeholder="Enter New-Password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div
                      className="input-group-text"
                      id=" ShowHidePassword1"
                      onClick={() => setShowPassword1(!showPassword1)}
                    >
                      {showPassword1 ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <div className="text-danger mb-2">{errors.password}</div>
                  )}
                  <div className="d-flex justify-content-center mb-3 mt-4">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Re-enter Password"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div
                      className="input-group-text"
                      id=" ShowHideConfirmPassword2"
                      onClick={() => setShowPassword2(!showPassword2)}
                    >
                      {showPassword2 ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <div className="text-danger mb-2">{errors.confirmPassword}</div>
                  )}
                </div>
                <div className="row mt-3">
                  <div className="col-md-offset-10">
                    <button className="btn btn-primary col-md-12" type="submit">
                      ReSet Password
                    </button>
                  </div>
                  <div className="col-md-offset-10 mt-3">
                    <p>
                      <Link to="/login" id="SignUp">
                        Goto Log-In
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
              {resetMessage && (
                <div className="mt-1">
                  <p>{resetMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
