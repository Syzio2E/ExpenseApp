import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const obj = {
      email,
      password,
    };
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type":"application/json"
      },
    })
    .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            const token = data.token;
            localStorage.setItem('token', token);
            toast.success("Successfull Login");
            setTimeout(() => {
              navigate("/home");
            }, 700);
          });
        } else if (res.status === 404) {
          toast.error("Invalid email or password");
        } else if (res.status === 400) {
          toast.error("password is incorrect");
        } else {
          throw new Error("something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleLogin = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="login">
        <h1> Login</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleLogin}>Not a User? SignUp</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
