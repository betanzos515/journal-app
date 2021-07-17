import React from "react";
import validator from "validator"; //<- libreria para validar el formulario
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setError,removeError } from "../../actions/ui";
import { startRegisterEmailPassword } from "../../actions/auth";

export const RegisterScreen = () => {

  const {msgError} = useSelector(state => state.ui) //<- hook de redux para retornar el estado global


  const dispatch = useDispatch(); //<- hook para usar el dispatch de redux.
  
  const usuario = {
    name: "usuario",
    email: "usuario@usuario.com",
    password: "123456",
    confirm: "123456",
  };

  const [formState, handleInputChange] = useForm(usuario); //<- coustom hook para el manejo del form
  const { name, email, password, confirm } = formState; 

  const handleRegister = (e) => { //<- manejador de registro
    e.preventDefault();
    if(isFormValid()){
      dispatch(startRegisterEmailPassword(email,password,name));
    }
  };

  const isFormValid = ()=>{ //<- funcion para validar el formulario
    if(name.trim().length === 0){
      dispatch(setError('Name is required'))
      return false;
    }else if(!validator.isEmail(email)){
      dispatch(setError('is not email'));
      return false;
    }else if( password !== confirm || password.length < 5){
      dispatch(setError('password should be al least 6 characters and match each other'));
      return false;
    }

    dispatch(removeError());
    return true;
  }


  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleRegister}>

        {
          ( msgError && <div className='auth__alert-error'>
            {msgError}
            </div>)
        }

        <input
          onChange={handleInputChange}
          className="auth__input "
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={name}
        ></input>

        <input
          onChange={handleInputChange}
          className="auth__input "
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
        ></input>

        <input
          onChange={handleInputChange}
          className="auth__input "
          type="password"
          placeholder="Password"
          name="password"
          value={password}
        ></input>

        <input
          onChange={handleInputChange}
          className="auth__input "
          type="password"
          placeholder="Confirm"
          name="confirm"
          value={confirm}
        ></input>

        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already registered ?
        </Link>
      </form>
    </>
  );
};
