import React from 'react'
import NavBar from './NavBar/NavBar'
import { Route, withRouter } from 'react-router-dom'
import API from "./API.js"
import './App.css'
import LoginComponent from '../src/Login/Login'
import SignUpComponent from '../src/SignUp/SignUp'
import DashboardContainer from '../src/Dashboard/Container/Dashboard'
import ProfileComponent from '../src/Dashboard/Components/Profile'

function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      user: {
        id: null,
        name: "",
        email: "",
        profileImage: null
      }
    }
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validate(localStorage.token)
        .then( user => this.signIn(user))
    }
  }
  
  signIn = (user) => {
    localStorage.token = user.token
    user.token = undefined
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    })
  }
  

  signOut = () => {
    this.setState({
      user: {
        ...this.state.user, 
        id: null,
        name: "",
        email: "",
        profileImage: ""
      }
    })
    localStorage.removeItem("token")
  }

  render(){
    return (
      <div >
    <Route exact path="/" component={(props) => <LoginComponent {...props} signIn={this.signIn}/>}/>
     <Route exact path="/signup" component={SignUpComponent}></Route>
     <Route exact path="/home" component={(props) => <DashboardContainer signOut={this.signOut} {...props}  user={this.state.user}/>}></Route>
     <Route exact path="/profile" component={(props) => <ProfileComponent {...props} user={this.state.user}/>}></Route>
      </div>
    )
  }
}


export default withRouter(App)