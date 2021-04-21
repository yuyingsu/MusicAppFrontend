import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { register } from '../actions/userActions';
import { createAddress } from '../actions/addressActions';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(13),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F08080"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [streetname, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const createAddressReducer = useSelector((state) => state.createAddress);
  const { addressId } = createAddressReducer;
  const userRegisterReducer = useSelector((state) => state.userRegister);
  const { error, success } = userRegisterReducer;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(addressId);
    if(success){
      alert("Register success! Please check your email to confirm your registeration.");
      history.go(-1);
    }
    if(addressId){
      dispatch(register(username, email, password, null, addressId));
    }
  }, [addressId, success])
  
  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(createAddress(streetname, city, state, zip));
  }

  return (
    <div style={{minHeight:"750px"}} className={classes.root}>
    {error && submitted && <Alert style={{marginTop:"80px"}} severity="error">{error}</Alert>}
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="streetname"
                label="Street Name"
                id="streetname"
                onChange={(e) => setStreetName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="city"
                label="City"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="state"
                label="State"
                id="state"
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="zip"
                label="Zip Code"
                id="password"
                onChange={(e) => setZip(e.target.value)}
              />
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to={'/signin'} variant="body2">
                {"Already have an account? Sign in."}
              </Link>
            </Grid>
          </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}