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
import NavBar from '../../NavBar/NavBar'

class ProfileComponent extends React.Component {

    constructor(){
        super()
        this.state = {
        name: "Nomis",
        image: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
        email: "nomis@nomis.com",
        user_status: ""
        }
    }
        
    submitChanges = event => {
        event.preventDefault()
        console.log(this.state)
    }

    userTyping = (type, event) => {
        switch(type){
            case 'name':
                this.setState({name: event.target.value})
                break;
            case 'image':
                this.setState({ image: event.target.value })
                break;
            case 'email':
                this.setState({ email: event.target.value })
        }
    }

    render() {
        const {classes} = this.props 
        return ( 
            <div>
                <NavBar/>
                <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Typography component='h1' variant='h5'>Edit Profile</Typography>
                <form className={classes.form} onSubmit={(event) => this.submitChanges(event)}>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor="profile-name-input">Change name: {this.state.name}</InputLabel>
                        <Input autoComplete='name' id='profile-name-input' onChange={(event) => {this.userTyping('name', event)}}></Input>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor="profile-image-input">Change Image</InputLabel>
                        <Input id='profile-image-input' onChange={(event) => {this.userTyping('image', event)}}></Input>
                        <img className={classes.profileEditImage} src={this.state.image}></img>
                    </FormControl>
                    <FormControl required fullWidth margin='normal'>
                        <InputLabel htmlFor="profile-email-input">Change email: {this.state.email}</InputLabel>
                        <Input autoComplete='email' id='profile-email-input' onChange={(event) => {this.userTyping('email', event)}}></Input>
                    </FormControl>
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>Make Changes</Button>
                </form>
                <br></br>
                </main>
            </div>
         );
    }
}
 
export default withStyles(styles)(ProfileComponent);