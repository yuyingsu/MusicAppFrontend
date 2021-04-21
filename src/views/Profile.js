import React from "react";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardAvatar from "../components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from "axios";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };

const useStyles = makeStyles(styles);

function Profile(props) {  
  const classes = useStyles();
  const [bio,setBio] = useState("");
  const [pic,setPic] = useState("");
  const [userName, setUserName] = useState("");
  const [sent, setSent] = useState(false);
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { userInfo } = userSignInReducer;

  useEffect(() => {
       getBio(props.id);
       getPic(props.id);
       sentRequest();
  }, [])

  async function getBio(id) {
    try{
    let response = await Axios.get("https://tangerinemusic.herokuapp.com/userprofile/"+id, {
    });
    setBio(response.data.bio);
    setUserName(response.data.username);
    }catch(error){
      console.log(error.response);
    }
  }

  async function getPic(id) {
    try{
    let response = await Axios.get("https://tangerinemusic.herokuapp.com/avatar/"+id, {
    });
    setPic(response.data)
    }catch(error){
      console.log(error.response);
    }
  }

  async function sentRequest() {
    try{
    let response = await Axios.get("https://tangerinemusic.herokuapp.com/hassentrequest/"+props.id, {
        headers: {
            "Authorization": ' Bearer ' + userInfo.access_token
          }
    });
    setSent(response.data)
    }catch(error){
      console.log(error.response);
    }
  }

  async function sendRequest() {
    try{
    let response = await Axios.post("https://tangerinemusic.herokuapp.com/sendrequest/"+props.id,{},{
        headers: {
            "Authorization": ' Bearer ' + userInfo.access_token
          }
    });
    setSent(true);
    }catch(error){
      console.log(error.response);
    }
  }

 let path=null;
 if(pic){
     path = "https://tangerinemusic.herokuapp.com/"+pic.replaceAll("\\","/");
     console.log(path);
  } 
  return(
  <div style={{marginTop:"80px", height:"562px"}}>
      <GridContainer justify="center">
       <GridItem xs={12} sm={12} md={4}>
          <Card profile style={{marginTop:"180px"}}>
            <CardAvatar profile>
                {path?<img src={path} alt="..." />:<img src={"https://i.stack.imgur.com/l60Hf.png"} alt="..." />}
            </CardAvatar>
            <CardBody profile>
              {userName?<p className={classes.cardCategory} style={{fontSize:"40px"}}>{userName}</p>:null}
              {bio?<h3 className={classes.description}>{bio}</h3>:null}
            </CardBody>
            {!userInfo || (userInfo && props.id==userInfo.user_id)?null:!sent?
            <Button onClick={sendRequest}>
                Add Friend
            </Button>:
            (<div>Sent Request<CheckIcon></CheckIcon></div>)
            }
          </Card>
        </GridItem>
      </GridContainer>
  </div>
  );
    }

export default Profile;