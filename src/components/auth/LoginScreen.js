import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {startGoogleLogin, startLoginEmailPassword} from '../../actions/auth'
import { useForm } from "../../hooks/useForm";

// import { login } from "../../actions/auth";

export const LoginScreen = () => {

  const [ formValues , handleInputChange ] = useForm({
    email: 'betanzos@gmail.com',
    password:'123456'
  });

  const {loading} = useSelector(state => state.ui)

  const { email, password } = formValues;

  const dispatch = useDispatch() //hooke de redux para manejar el dispatch

  const handleLogin = (e)=>{
    e.preventDefault();
    dispatch(startLoginEmailPassword(email,password));
  }

  const handleLoginGoogle = ()=>{
      dispatch(startGoogleLogin());
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form onSubmit={handleLogin}>
        <input className='auth__input'type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={handleInputChange}></input>

        <input className='auth__input'type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange}></input>

        <button className='btn btn-primary btn-block' type="submit"  disabled={loading}>Login</button>

        <div className='auth_social-networks'>
          <p>Login with social networks</p>
          <div 
            className="google-btn"
            onClick={handleLoginGoogle}>
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
        <Link className='link'to='/auth/register'>
            Create new acount.
        </Link>
      </form>
    </>
  );
};
