import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Axios from "axios";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { signin } from '../actions/userActions';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F08080",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { error, userInfo } = userSignInReducer;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(userInfo){
    history.push('/');
    }
  }, [userInfo])

  useEffect(() => {
    setSubmitted(true);
  }, [error])
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(username, password));
  }

  async function resendConfirmation(e) {
    e.preventDefault();
    try{
      let response = await Axios.post("https://tangerinemusic.herokuapp.com/reconfirm", {email}, {
      });
      }catch(error){
        console.log(error.response);
      }
  }

  return (
    <div style={{minHeight:"650px"}}>
    <Container component="main" maxWidth="xs">
      {error && submitted && <Alert style={{marginTop:"80px"}} severity="error">{error}</Alert>}
      {error=='The user has not confirmed registration.' && <div><TextField margin="normal" label="Please enter your email:" onChange={(e) => setEmail(e.target.value)}></TextField>
      <Button variant="contained" color="primary" style={{textAlign:"center", marginTop:"20px"}} 
      onClick={resendConfirmation}>Resend the confirmation</Button></div>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={'/register'} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}
