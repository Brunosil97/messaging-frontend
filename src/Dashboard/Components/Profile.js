import React from "react";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NavBar from "../../NavBar/NavBar";
import API from "../../API";


import Paper from "@material-ui/core/Paper";

class ProfileComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email
    })
  }

  submitChanges = (event) => {
    event.preventDefault();
    API.patch(`users/${this.props.user.id}`, {
      user: {
        name: this.state.name,
        email: this.state.email
      }
    })
    this.props.history.push("/home")
  };

  userTyping = (type, event) => {
    switch (type) {
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      default:
        break;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar signOut={this.props.signOut}/>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <CssBaseline></CssBaseline>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <form
              className={classes.form}
              onSubmit={(event) => this.submitChanges(event)}
            >
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="profile-name-input">
                  Change name: {this.props.user.name}
                </InputLabel>
                <Input
                  id="profile-name-input"
                  value={this.state.name}
                  onChange={(event) => {
                    this.userTyping("name", event);
                  }}
                ></Input>
              </FormControl>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="profile-email-input">
                  Change email: {this.props.user.email}
                </InputLabel>
                <Input
                  id="profile-email-input"
                  value={this.state.email}
                  onChange={(event) => {
                    this.userTyping("email", event);
                  }}
                ></Input>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Make Changes
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileComponent);
