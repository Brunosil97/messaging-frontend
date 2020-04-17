import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class NewMessage extends Component {
  render() {
    return (
      <div className="NewMessageStyle">
        <Paper className="NewMessagePaper">
          <Typography component="h1" variant="h5">
            New Chat
          </Typography>
          <form onSubmit={this.props.HandleNewMessageSubmit}>
            <FormControl required fullWidth margin="normal">
              <Input
                autoComplete="userInfo"
                id="user-info-input"
                placeholder="User Email"
                name="NewMessageUsers"
                onKeyUp={this.props.NewMessageTyping}
              ></Input>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Start Chat
            </Button>
          </form>
          <h3 onClick={this.props.HandleNewMessageBack}>Go Back</h3>
        </Paper>
      </div>
    );
  }
}
