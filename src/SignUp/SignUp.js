import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Data from '../database'


class LoginComponent extends React.Component {
    state = { 
        email: '',
        password: ''
     }

     onFormSubmit = (event) => {
        event.preventDefault()
        return this.props.history.push("/home")
        // return fetch(Data, {
        //      method: "POST",
        //      headers: {
        //          'Content-Type': 'application/json',
        //          'Accept': 'application/json'
        //      },
        //      body: JSON.stringify(event.target.value)
        //  })
        //  .then(res => res.json())
        //  .then(data => console.log(data))
        //  .then(() => this.props.history.push("/home"))
     }

     addUserToState = (event) => {
         switch (event.target.name) {
             case "email" :
                 this.setState({email: event.target.value})
                 break
            case "password" :
                this.setState({password: event.target.value})
                break
                default :
                break;
         }
     }
    render() { 
        const {classes} = this.props;
        return ( 
           <main className={classes.main}>
               <CssBaseline/>
               <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Instant Messaging</Typography>
                    <form onSubmit={(e) => this.onFormSubmit(e)}>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel>Email</InputLabel>
                        <Input name="email" onChange={(e) => this.addUserToState(e)} autoComplete='email'></Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel>Password</InputLabel>
                        <Input name="password" onChange={(e) => this.addUserToState(e)} ></Input>
                    </FormControl>
                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>Log In!</Button>
                    </form>
                <h5 className={classes.noAccountHeader}>Already have an account?</h5>
                <Link className={classes.signUpLink} to='/login'>Log In!</Link>
               </Paper>
           </main>
        );
    }
}
 
export default withStyles(styles)(LoginComponent);