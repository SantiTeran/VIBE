import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginUser from "../../redux/actions/userLogin";
import style from "./Login.module.css";
import GoogleLogin from 'react-google-login';

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const User = useSelector(state => state.User)
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function validations(input) {
    const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    if (!regExpEmail.test(input.email)) error.email = "The email is invalid";
    return error
  }

  function handleChange(e) {
    setError(
      validations({
        ...login,
        [e.target.name]: e.target.value,
      })
    );
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    if (
      !login.email ||
      !login.password
    ) {
      alert("Incomplete data");
    } else {
      dispatch(loginUser(login))
      navigate('/home')
    }
  }
  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className={style.containerLogin}>
      <h3 className={style.titleForm}>Log in</h3>
      <form className={style.containerForm} onSubmit={handleSubmit}>
        <label className={style.labelForm}>Email</label>
        <input
          type="text"
          id="email"
          name="email"
          className={style.inputLogin}
          placeholder="example@gmail.com"
          onChange={handleChange}
        />
        <label className={style.labelForm}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={style.inputLogin}
          placeholder="Enter your Password"
          onChange={handleChange}
        />
        <button type="submit" className={style.buttonLogin}>
          Login
        </button>
      </form>
      <GoogleLogin
    clientId="588392350787-kita7pgttuvevqp5kuu8gt02ib39fi92.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
    </div>
  );
};

export default Login;
