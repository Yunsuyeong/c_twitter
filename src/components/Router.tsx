import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Edit from "../routes/Edit";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

interface RouterProps {
    userObj: any;
    isLoggedIn: boolean;
    refreshUser: any;
}

const AppRouter = ({ userObj, isLoggedIn, refreshUser }: RouterProps) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/profile/edit">
                            <Edit userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
