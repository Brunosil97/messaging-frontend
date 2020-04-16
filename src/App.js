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
      id: null,
      name: "",
      email: "",

    }
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validate(localStorage.token)
        .then(user => this.signIn(user))
        .then(() => this.props.history.push('/home'))
    }
    // const userId = parseJwt(localStorage.token);
    // console.log(userId);
    // API.getFetch(`users/${parseJwt(localStorage.token).id}`).then((res) =>
    //   this.setState({ user: res })
    // );
  }
  
  signIn = (user) => {
    this.setState( user )
  }
  signOut = () => {
    this.setState({
      id: null,
      name: "",
      email: ""
    })
    localStorage.removeItem("token")
  }

  render(){
    return (
      <div >
    <Route exact path="/" component={(props) => <LoginComponent {...props} signIn={this.signIn}/>}/>
     <Route exact path="/signup" component={SignUpComponent}></Route>
     <Route exact path="/home" component={(props) => <DashboardContainer signOut={this.signOut} {...props} email={this.state.email} user={this.state.user}/>}></Route>
     <Route exact path="/profile" component={(props) => <ProfileComponent {...props} user={this.state.user}/>}></Route>
      </div>
    )
  }
}


export default withRouter(App)