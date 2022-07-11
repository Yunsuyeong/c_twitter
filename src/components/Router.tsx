import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Edit from "../routes/Edit";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import { UserObj } from "./App";
import Navigation from "./Navigation";

export interface RouterProps {
    userObj: UserObj | undefined;
    isLoggedIn: boolean;
    refreshUser: any;
}

const AppRouter = ({ userObj, isLoggedIn, refreshUser }: RouterProps) => {
    return (
        <Router>
            {isLoggedIn && (
                <Navigation
                    userObj={userObj}
                    isLoggedIn={true}
                    refreshUser={undefined}
                />
            )}
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
                            <Edit
                                userObj={userObj}
                                isLoggedIn={isLoggedIn}
                                refreshUser={refreshUser}
                            />
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
