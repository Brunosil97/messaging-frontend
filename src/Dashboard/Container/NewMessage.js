import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import API from "../../API"
import NavBar from "../../NavBar/NavBar"

export default class NewMessage extends Component {

  state = {
    NewMessageUsers: null,
    error: null
  }

  HandleNewMessageSubmit = (e) => {
    e.preventDefault();

    API.post("new_chat", {
      chat: {
        hasRead: false,
      },
      user_id: this.props.user.id,
      email: this.state.NewMessageUsers,
    }).then(resp => resp.error? this.setState({error: resp.error}): this.props.history.push("/home"));
  };

  NewMessageTyping = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  HandleNewMessageBack = () => {
    this.props.history.push("/home")
  }

  render() {
    return (
      <div>
      <NavBar signOut={this.props.signOut}/>
        <div className="NewMessageStyle">
          <Paper className="NewMessagePaper">
            <Typography component="h1" variant="h5">
              New Chat
            </Typography>
            {this.state.error? <h3>{this.state.error}</h3>: null}
            <form onSubmit={this.HandleNewMessageSubmit}>
              <FormControl required fullWidth margin="normal">
                <Input
                  autoComplete="userInfo"
                  id="user-info-input"
                  placeholder="User Email"
                  name="NewMessageUsers"
                  onKeyUp={this.NewMessageTyping}
                ></Input>
              </FormControl>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Start Chat
              </Button>
            </form>
            <h3 onClick={this.HandleNewMessageBack}>Go Back</h3>
          </Paper>
        </div>
      </div>
    );
  }
}
