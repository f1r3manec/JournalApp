import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import validator from "validator";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  //Retorna el estado y se puede extraer con parcialmente con useSelector
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };
  const isFormValid = () => {
    //se instala npm validator para validaci[on de campos del formulario ]
    if (name.trim().length < 5) {
      dispatch(setError("Name Required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("is not a Email "));
      return false;
    } else if (password !== confirmPassword || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );

      return false;
    }
    //dispatch(removeError());
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth__input"
          onChange={handleInputChange}
          value={password}
          autoComplete="off"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="auth__input"
          onChange={handleInputChange}
          value={confirmPassword}
          autoComplete="off"
        />
        <button className="btn mb-5 btn-block  btn-primary" type="submit">
          Register
        </button>

        <Link className="link " to="/auth/login">
          Alredy registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
