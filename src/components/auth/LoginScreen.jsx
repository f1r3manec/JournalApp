import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { setError } from "../../actions/ui";
const LoginScreen = () => {
  const { loading, msgError } = useSelector((state) => state.ui);
  // const {  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      dispatch(setError("Valide correo"));
      return false;
    } else if (password.length < 5) {
      dispatch(setError("Valide su clave"));
      return false;
    }
    dispatch(startLoginEmailPassword(email, password));
  };
  const handleGoogleLogin = (e) => {
    dispatch(startGoogleLogin());
  };
  return (
    <>
      <h3 className="auth__title">Login</h3>
      {msgError && <div className="auth__alert-error">{msgError}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          className="btn btn-block  btn-primary"
          type="submit"
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
