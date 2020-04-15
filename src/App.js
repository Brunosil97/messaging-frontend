import React from 'react'
import { Route } from 'react-router-dom'
// Import an object containing all of our functions which will communicate with the server and name it API
import API from "./API.js"
import './App.css'
import LoginComponent from '../src/Login/Login'
import SignUpComponent from '../src/SignUp/SignUp'
import DashboardContainer from '../src/Dashboard/Container/Dashboard'
import ProfileComponent from '../src/Dashboard/Components/Profile'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      email: null
    }
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validate(localStorage.token)
        .then(json => this.signIn(json.email, json.token))
    }
  }
  
  signIn = (email, token) => {
    this.setState({
      email
    })
    localStorage.token = token
  }
//   signOut = () => {
//     this.setState({
//       email: null
//     })
//     localStorage.removeItem("token")
//   }

  render(){
    return (
      <div >
    <Route exact path="/" component={(props) => <LoginComponent {...props} signIn={this.signIn}/>}/>
     <Route exact path="/signup" component={SignUpComponent}></Route>
     <Route exact path="/home" component={(props) => <DashboardContainer {...props} email={this.state.email}/>}></Route>
     <Route exact path="/profile" component={ProfileComponent}></Route>
      </div>
    )
  }
}


export default App