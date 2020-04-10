import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginComponent from '../src/Login/Login'
import SignUpComponent from '../src/SignUp/SignUp'
import DashboardContainer from '../src/Dashboard/Container/Dashboard'
import ProfileComponent from '../src/Dashboard/Components/Profile'

ReactDOM.render(
  
   <Router>
     <Route exact path="/" component={LoginComponent}></Route>
     <Route exact path="/signup" component={SignUpComponent}></Route>
     <Route exact path="/home" component={DashboardContainer}></Route>
     <Route exact path="/profile" component={ProfileComponent}></Route>
   </Router>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
