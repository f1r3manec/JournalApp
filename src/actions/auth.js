import Swal from "sweetalert2";
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../fireBase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import { noteLogOut } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        dispatch(await login(user.uid, user.displayName));
      })
      .then(dispatch(finishLoading()))
      .catch((err) => {
        dispatch(finishLoading());
        Swal.fire("Fail", err.message, "error");
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire("Fail", err.message, "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
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
    dispatch(noteLogOut());
    dispatch(logout());
  };
};

export const logout = () => ({ type: types.logout });
