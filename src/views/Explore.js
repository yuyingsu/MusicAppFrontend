import React from "react";
import Axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MDBCard, MDBCardBody, MDBCardText, MDBRow, MDBCol, MDBIcon } from
'mdbreact';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #a18bd1 30%, #fbc1eb 90%)',
      color: 'white',
      height: 200,
      padding: '0 30px',
    },
  });

  
function Explore() {
    const classes = useStyles();
    const [lists, setLists] = useState([]);
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        recommendateList();
        recommendateEvent();
    }, [])
    
    async function recommendateList() {
        try{
        let response = await Axios.get("https://tangerinemusic.herokuapp.com/recommendate/"+userInfo.user_id, {
          headers: {
            "Authorization": ' Bearer ' + userInfo.access_token
          }
        });
        let temp = [];
        response.data.map(e=>{
            temp.push({title: e.title, id: e.id});
        });
        setLists(temp);
        }catch(error){
          if(error.response){
            setMessage(error.response['data']['message']);
          }
        }
    }

    async function recommendateEvent() {
      try{
      let response = await Axios.get("https://tangerinemusic.herokuapp.com/recommendateevent/"+userInfo.user_id, {
        headers: {
          "Authorization": ' Bearer ' + userInfo.access_token
        }
      });
      let temp = [];
      response.data.map(e=>{
          temp.push({headline: e.headline, id: e.id});
      });
      setEvents(temp);
      }catch(error){
        console.log(error.response);
      }
      }
    let res=null;
    if(lists.length>0){
      res = lists.map((e)=>
        <MDBCol>
        <MDBCard className="rounded mb-0" style={{width:"550px", margin:"20px"}}>
        <div className={classes.root}>
            <h2 style={{margin:"50px", textAlign:"center"}}>{e.title}</h2>
        </div>
          <MDBCardBody cascade className='text-center'>
            <MDBCardText>
            <Link to={`/list/${e.id}`}>Show Detail</Link>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
        );
    }else{
      console.log(message);
      if(message=="The user hasn't liked any list"){
        res = <MDBCol><Alert severity="error">You haven't liked any playlist. Like a list and enjoy the recommendation.</Alert></MDBCol>
      }else{
        res = <MDBCol><Alert severity="error">You liked every playlist available. Please check back later.</Alert></MDBCol>
      }
    }
    let res1 = null;
    if(events.length){
    res1 = events.map((e)=>
    <MDBCol>
    <MDBCard className="rounded mb-0" style={{width:"550px", margin:"20px"}}>
    <div className={classes.root}>
        <h2 style={{padding:"50px", textAlign:"center"}}>{e.headline}</h2>
    </div>
      <MDBCardBody cascade className='text-center'>
        <MDBCardText>
        <Link to={`/event/${e.id}`}>Show Detail</Link>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
    );
    }else{
      res1 = <MDBCol><Alert severity="error">No new events in your zip code available. Please check back later.</Alert></MDBCol>
    }

  return(
    <div style={{marginTop: "80px", minHeight:"652px"}} >
        <div style={{textAlign:"center", padding:"50px"}}>
        <h1>
        Recommendated List For You
        </h1>
        {!userInfo&&<div style={{marginTop:"50px", textAlign:"center"}}>Sign in for personal recommendation</div>}
        </div>
        <MDBRow style={{margin:"30px", textAlign:"center"}}>
        {userInfo && res}
        </MDBRow>
        <div>
        <div style={{textAlign:"center", padding:"50px"}}>
        <h1>
        Events Near You
        </h1>
        {!userInfo&&<div style={{marginTop:"50px", textAlign:"center"}}>Sign in for personal recommendation</div>}
        </div>
        <MDBRow style={{margin:"30px"}}>
        {userInfo && res1}
        </MDBRow>
        <div></div>
        </div>
    </div>);
    }

export default Explore;