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

class LoginComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            email: null,
            password: null,
            loginError: ""
        }
    }
    submitLogin = event => {
        event.preventDefault()
        this.props.history.push('/home')
            //need authentication
            // // .then(() => {
            //     this.props.history.push('/home')
            // }, err => {
            // this.setState({ loginError: 'Login Error'})
            // console.log(err)
            // })
        }
    userTyping = (type, event) => {
        switch (type){
            case 'email':
                this.setState({ email: event.target.value})
                break;
            case 'password':
                this.setState({ password: event.target.value})
                break;
            default:
                break;
        }
    }
    render() {
        const {classes} = this.props;
        return(
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>Log in!</Typography>
                    <form className={classes.form} onSubmit={(event) => this.submitLogin(event)}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor="login-email-input">Enter email</InputLabel>
                            <Input autoComplete='email' autoFocus id='login-email-input' onChange={(event => this.userTyping('email', event))}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor="login-password-input">Enter password</InputLabel>
                            <Input type='password' id='login-password-input' onChange={(event => this.userTyping('password', event))}></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Log in</Button>
                    </form>
                    {
                        this.state.loginError ?
                        <Typography className={classes.errorText} component='h5' varaiant='h6'>
                            Incorrect Login Information
                        </Typography>: null
                    }
                    <Typography component='h5' variant='h6' className={classes.noAccountHeader}>Don't have an account?</Typography>
                    <Link className={classes.signUpLink} to='/signup'>Sign Up</Link>
                </Paper>
            </main>
            )
    }
}
export default withStyles(styles)(LoginComponent)