import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Catalog from "../pages/Catalog";
import Item from "../pages/Item";
import Deal from "../pages/Deal";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import {didUserLogin} from "../api/api";
import {loggedInKey} from "../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {getAccess, setAccess} from "../redux/accessSlice";


function Routing() {

    const dispatch = useDispatch();
    const access = useSelector(getAccess);

    useEffect(() => {
        didUserLogin(localStorage.getItem(loggedInKey)).then((data) => {
            if (data.result == true) {
                dispatch(setAccess(data.result));
            } else {
                dispatch(setAccess(false));
            }
        });
    }, [access, dispatch])

    return (
        <Router>
            <Switch>

                <ProtectedRoute exact path="/" access={access} component={Catalog}/>
                <ProtectedRoute exact path="/catalog" access={access} component={Catalog}/>
                <ProtectedRoute exact path="/catalog:id" access={access} component={Item}/>
                <ProtectedRoute exact path="/deal" access={access} component={Deal}/>

                <Route exact path="/login">
                    {access ? (
                        <Redirect to="/"/>
                    ) : (
                        <Login/>
                    )}
                </Route>

                <Route exact path="/register">
                    {access ? (
                        <Redirect to="/"/>
                    ) : (
                        <Register/>
                    )}
                </Route>

                <Route exact path="*" component={NotFound}/>

            </Switch>
        </Router>
    );
}

export default Routing;