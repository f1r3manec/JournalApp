import React from "react";
import AuthRouter from "./AuthRouter";
import { firebase } from "../fireBase/firebaseConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { login } from "../actions/auth";
import JournalScreen from "../components/journal/JournalScreen";

import { useState } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";
import { startLoadingNotes } from "../actions/notes";

const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);
  if (checking) {
    return <h1>Ingresando</h1>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path="/"
            component={JournalScreen}
          />

          <PublicRoute
            to="/auth/login"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
