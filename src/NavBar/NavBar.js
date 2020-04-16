import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";

const ButtonAppBar = (props) => {
  const { classes, ResetNewMessageBack } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            className={classes.title}
            onClick={ResetNewMessageBack}
          >
            <NavLink to="/home" exact>
              Home
            </NavLink>
          </Button>
          <Button color="inherit" className={classes.title}>
            <NavLink to="/profile" exact>
              Profile
            </NavLink>
          </Button>
          <Button onClick={() => props.signOut()}
          color="inherit" className={classes.title}>
            <NavLink to="/" exact>
              Sign Out
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(ButtonAppBar);
