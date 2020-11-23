import React, { Fragment } from 'react';
import queryParser from 'query-string';
import Auth from './components/Auth';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Tracks from "./components/Tracks";
import 'bootswatch/dist/journal/bootstrap.min.css'

function App() :JSX.Element {

  let parsed = queryParser.parse(window.location.search);
  let accessToken : string = parsed.access_token + "";
  localStorage.setItem('access_token',accessToken)
  const route : string = (accessToken != 'undefined') ? 'tracks' : 'auth'

  return (
    <Router>
        <Switch>
            <Route path={'/auth'} component={Auth}></Route>
            <Route path={'/tracks'} component={Tracks}></Route>
        </Switch>
        <Redirect to={route}  />
    </Router>
  );
}

export default App;
