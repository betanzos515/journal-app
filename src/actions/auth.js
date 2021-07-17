/* crearemos nuestros primeros accions */
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);
        if(e.code ==='auth/user-not-found'){
          Swal.fire('Error',e.message,'error');
          dispatch(finishLoading());
        }
      });
  };
};

export const startRegisterEmailPassword = (email, password, name) => {
  return (dispatch) => {
    //<- retornamos una funcion con el dispatch gracias a thunk
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          //<- funcion que nos permite agregar un displayName a mi aplicacion
          displayName: name,
        });
      })
      .catch((e) => {
        // console.log(`Error : ${e}`);
        Swal.fire('Error',e.message,'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    // firebase.auth.signInWithPopup(googleAuthProvider);
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch( logout() );
    dispatch( noteLogout() )
  };
};

export const logout = () => ({
  type: types.logout,
});
