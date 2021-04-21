import React from "react";
import CheckIcon from '@material-ui/icons/Check';
import { getEvent } from "../actions/eventActions";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import background from '../assets/img/event.jpg';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
    root: {
      background: `url(${background})`,
      backgroundSize: 'cover',
      zIndex: '1'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

  }));

function Event(props) { 
  const dispatch = useDispatch();
  const classes = useStyles(); 
  const getEventReducer = useSelector((state) => state.singleEvent);
  const { event, users, address } = getEventReducer;
  const [attended, setAttended] = useState(false); 
  const [open, setOpen] = useState(false);
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { userInfo } = userSignInReducer;

  useEffect(() => {
    dispatch(getEvent(props.id));
    isAttended();
  }, [])

  async function isAttended() {
    try{
    console.log(event);
    let response = await Axios.get("https://tangerinemusic.herokuapp.com/isattended/"+props.id, {
        headers: {
            "Authorization": ' Bearer ' + userInfo.refresh_token
          }
    });
    console.log(response);
    setAttended(response.data);
    }catch(error){
      console.log(error.response);
    }
  }

  async function signUp() {
    try{
    console.log(event);
    let response = await Axios.post("https://tangerinemusic.herokuapp.com/signup/"+props.id, {}, {
        headers: {
            "Authorization": ' Bearer ' + userInfo.refresh_token
          }
    });
    setAttended(true);
    }catch(error){
      console.log(error.response);
    }
  }

  async function undoSignUp() {
    try{
    console.log(event);
    let response = await Axios.post("https://tangerinemusic.herokuapp.com/undosignup/"+props.id, {}, {
        headers: {
            "Authorization": ' Bearer ' + userInfo.refresh_token
          }
    });
    setAttended(false);
    }catch(error){
      console.log(error.response);
    }
  }

  const format = (dateString) =>{
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sun"
    ];
    var date = new Date(dateString);
    var pm = date.getHours()>12?"pm":"am";
    var hr = date.getHours()>12?date.getHours()-12:date.getHours();
    return monthNames[date.getMonth()]+" "+date.getDate()+" • "+dayNames[date.getDay()]+" • "+hr+":"+date.getMinutes()+pm;
  }

  return(
  <div style={{marginTop:"78px", minHeight:"562px", color:"white"}} className="card" className={classes.root}>
        {event?<div style={{margin:"20px"}}>
            <div style={{fontSize:"90px", paddingTop:"80px", marginLeft:"50px", fontFamily:"Verdana", fontWeight:"bold"}}>{event.headline}</div>
            {users[0] && <div style={{fontSize:"18px", marginLeft:"50px"}}>Hosted by: {users[0].username}</div>}
            <div style={{fontSize:"20px", marginTop:"20px", marginLeft:"50px"}}><EventIcon style={{marginBottom:"4px"}}/>{format(event.date.substring(0,19))}</div>
            <div style={{fontSize:"20px", marginTop:"20px", marginLeft:"50px"}}><LocationCityIcon  style={{marginBottom:"4px"}}/>{address.streetName}{", "}{address.city}{", "}{address.state}{", "}{address.zip}</div>
            {userInfo && event.user_id!=userInfo.user_id && !attended?
            <Button variant="contained" color="primary" style={{marginTop:"30px", marginLeft:"50px"}} onClick={signUp}>Attend</Button>:
            <div style={{margin:"10px",marginLeft:"50px"}}>
            {userInfo && <div><CheckIcon></CheckIcon>Signed Up</div>}
            <div style={{marginTop:"10px"}}>
            {userInfo && event.user_id!=userInfo.user_id?<Button variant="contained" color="secondary" 
            onClick={undoSignUp}>Undo Sign Up</Button>:null}
            </div>
            </div>
            }
        </div>:null}
        {event && 
             <div style={{fontSize:"18px", marginLeft:"70px"}}>
                 {event.description}
             </div>
       } 
  </div>
  );
    }

export default Event;
