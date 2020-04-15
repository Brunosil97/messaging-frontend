import { Link } from "react-router-dom";
import React from "react";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import API from "../API";

class LoginComponent extends React.Component {
  state = {
    name: '',
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.passwordConfirmation) {
      alert("The user could not be created");
      return;
    }
    API.post("users", {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
        name: this.state.name,
      },
    }).then(() => this.props.history.push("/"));

  };

  addUserToState = (event) => {
    switch (event.target.name) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "confirm-password":
        this.setState({ passwordConfirmation: event.target.value });
        break;
      case "name":
        this.setState({ name: event.target.value });
        break;
      default:
        break;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Instant Messaging
          </Typography>
          <form onSubmit={(e) => this.onFormSubmit(e)}>
          <FormControl required fullWidth margin="normal">
              <InputLabel>Name</InputLabel>
              <Input
                name="name"
                focus="true"
                onChange={(e) => this.addUserToState(e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel>Email</InputLabel>
              <Input
                type="email"
                name="email"
                onChange={(e) => this.addUserToState(e)}
                autoComplete="email"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                name="password"
                onChange={(e) => this.addUserToState(e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel>Confirm Password</InputLabel>
              <Input
                type="password"
                name="confirm-password"
                onChange={(e) => this.addUserToState(e)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Account!
            </Button>
          </form>
          <h5 className={classes.noAccountHeader}>Already have an account?</h5>
          <Link className={classes.signUpLink} to="/">
            Log In!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginComponent);
