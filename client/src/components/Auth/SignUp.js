import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Constants from '../constants/Queries';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
    mobile: '',    
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(state.username.length > 0 && state.email.length > 0 &&
       state.password.length > 0 && state.mobile.length > 0){
      const query = Constants.signUp(
        state.username,
        state.email,
        state.password,
        state.mobile
      );  
      console.log(query);
      Constants.request(query).then(response => {
        if(response.data.data.addUser) {
          props.history.push('/signIn');
        } else if (response.data.errors){
          alert('Error in signing up');
        }
      }).catch(err => {
        console.log(err);
        alert('Error in signing up');
      });   
    } else {
      alert(`There's some empty fields`);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create new Account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='username'
                name='username'
                variant='outlined'
                required = {true}
                fullWidth
                onChange={handleChange}
                value={state.userName}
                id='username'
                label='username'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required = {true}
                fullWidth
                id='email'
                onChange={handleChange}
                value={state.email}
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required = {true}
                fullWidth
                name='mobile'
                label='Mobile Number'
                onChange={handleChange}
                value={state.mobile}
                type='number'
                id='mobile'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required = {true}
                fullWidth
                name='password'
                label='Password'
                type='password'
                onChange={handleChange}
                value={state.password}
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='signIn' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
