import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import {AppLayout} from "./components"
import { Posts, PostsDetails, ErrorPage} from "./views"

export const App = () => 
<BrowserRouter>
<AppLayout>
  <Switch>
    <Redirect exact from="/" to="/posts" />
    <Route exact path="/posts"  component={Posts} />
    <Route path="/posts/:id" component={PostsDetails} />
    <Route component={ErrorPage} />
  </Switch>
</AppLayout>
</BrowserRouter>
;
