import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import API from "./API.js"
import './App.css'
import LoginComponent from '../src/Login/Login'
import SignUpComponent from '../src/SignUp/SignUp'
import DashboardContainer from '../src/Dashboard/Container/Dashboard'
import ProfileComponent from '../src/Dashboard/Components/Profile'
import NewMessage from '../src/Dashboard/Container/NewMessage'

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
    <Route exact path="/" render={(props) => <LoginComponent {...props} signIn={this.signIn}/>}/>
    <Route exact path="/new_message" render={(props) => <NewMessage signOut={this.signOut} {...props}  user={this.state.user} />}/>
     <Route exact path="/signup" component={SignUpComponent}></Route>
     <Route exact path="/home" render={(props) => <DashboardContainer signOut={this.signOut} {...props}  user={this.state.user}/>}></Route>
     <Route exact path="/profile" render={(props) => <ProfileComponent {...props} signOut={this.signOut} user={this.state.user}/>}></Route>
      </div>
    )
  }
}


export default withRouter(App)