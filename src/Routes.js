import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./containers/Home";
import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import ChangePassword from "./containers/auth/ChangePassword";
import NewNote from "./containers/notes/NewNote";
import Notes from "./containers/notes/Notes";

import AppliedRoute from "./components/AppliedRoute";
import NotFound from "./containers/NotFound";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" exact component={Login} props={childProps}/>
        <AppliedRoute path="/signup" exact component={Signup} props={childProps}/>
        <AppliedRoute path="/changepwd" exact component={ChangePassword} props={childProps}/>
        <AppliedRoute path="/notes/new" exact component={NewNote} props={childProps}/>
        <AppliedRoute path="/notes/:id" exact component={Notes} props={childProps}/>

        <Route component={NotFound} />
    </Switch>;