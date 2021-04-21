import Sidebar from '../components/Sidebar';
import { getBio } from '../actions/userActions';
import { userPic } from '../actions/userActions';
import { uploadPic } from '../actions/userActions';
import { updateBio } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import { MDBInput } from 'mdbreact';
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardAvatar from "../components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";

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

function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("");
  const getBioReducer = useSelector((state) => state.userBio);
  const getPicReducer = useSelector((state) => state.userPic);
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { bio } = getBioReducer;
  const { pic } = getPicReducer;
  const { userInfo } = userSignInReducer;

  useEffect(() => {
      if(userInfo){
        dispatch(getBio(userInfo.user_id));
        dispatch(userPic(userInfo.user_id));
      }
  }, [])

  useEffect(() => {
    if(!userInfo){
      history.push('/signin');
    }
  }, [userInfo])

  const uploadAvatar = (e) => {
    const selectedFile = e.target.files[0];
    const image = new FormData();
    image.append('image', selectedFile);
    dispatch(uploadPic(image));
  }

  const submitBio = () => {
    dispatch(updateBio(value));
    setValue("");
  }
  let path=null;
  if(pic)
  {
    path = "https://tangerinemusic.herokuapp.com/"+pic.replaceAll("\\","/");
    console.log(path);
  } 
  return(
      <div className="app">
      <div style={{marginTop:"80px", height:"562px"}}>
      <Sidebar></Sidebar>
      </div>
      <main className="btn-toggle"> 
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Update Bio</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <MDBInput type="textarea" rows="5" value={value} onChange={(e)=>{setValue(e.target.value)}}/>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={submitBio}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
                {path?<img src={path} alt="..." />:<img src={"https://i.stack.imgur.com/l60Hf.png"} alt="..." />}
            </CardAvatar>
            <CardBody profile>
              {userInfo?<h2 className={classes.cardCategory}>{userInfo.username}</h2>:null}
              {bio?<p className={classes.description}>{bio.bio}</p>:null}
              <input type="file" style={{margin:"30px"}} onChange={(e)=>{uploadAvatar(e)}} /> 
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </main>
      </div>
      );
    }

export default UserProfile;
