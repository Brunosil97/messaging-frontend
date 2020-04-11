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
    state = { 

     }
    render() { 
        const {classes} = this.props;
        return ( 
           <main className={classes.main}>
               <CssBaseline/>
               <Paper className={classes.paper}>
                    <Typography component="h1">this is the log in</Typography>
                    <form>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel>Email</InputLabel>
                        <Input>sss</Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel>Password</InputLabel>
                        <Input>ssdfds</Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel>Confirm Password</InputLabel>
                        <Input>ssdsdd</Input>
                    </FormControl>
                    <Button className={classes.submit}>this is a button</Button>
                    </form>
               </Paper>
           </main>
        );
    }
}
 
export default withStyles(styles)(LoginComponent);