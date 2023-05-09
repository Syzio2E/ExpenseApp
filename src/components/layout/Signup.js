import React, { useRef} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const obj = {
      username,
      email,
      password,
    };

    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          res.json().then((data)=>{
            const token = data.token
            localStorage.setItem('token',token)
          })
          toast.success(`${username} Successfully signed Up` )
          setTimeout(()=>{
            navigate('/home')
          },1000)
        } else if (res.status === 409) {
          toast.error("Email already exists");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <React.Fragment>
    <div className="signup_wrapper">
      <h1> Sign Up</h1>
      <div className="form_container">
      <form onSubmit={submitHandler}>
        <label className="title"  htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          ref={usernameRef}
          required
        />
        <label className="title" htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" ref={emailRef} required />
        <label className="title"  htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      </div>
      <ToastContainer />
    </div>
      <button onClick={handleLogin}>Already a User? Login</button>
    </React.Fragment>
  );
};

export default Signup;
