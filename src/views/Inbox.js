import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { Navbar } from 'react-bootstrap';
import ColoredCircle from "../components/ColoredCircle";
import { Button } from 'reactstrap';
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
      },
      chatSection: {
        width: '100%',
        height: '80vh'
      },
      headBG: {
          backgroundColor: '#e0e0e0'
      },
      borderRight500: {
          borderRight: '1px solid #e0e0e0'
      },
      messageArea: {
        height: '60vh',
        overflowY: 'auto',
        padding: 0
      }
  }));


function Inbox(props) {
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const userSignInReducer = useSelector((state) => state.userSignin);
    const { userInfo } = userSignInReducer;
    const allMessagesReducer = useSelector((state) => state.allMessages);
    const { messages } = allMessagesReducer;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [message, setMessage] = useState("");
    const [current, setCurrent] = useState("");
    const [onlineFriends, setOnlineFriend] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getPendingRequests();
        props.socket.emit('online_friends');
        props.socket.on('users', function(msg) {
            setOnlineFriend(msg['users']);
       });
    }, [])

    useEffect(() => {
        window.localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages])

    useEffect(() => {
      if(!userInfo){
        history.push('/signin');
      }
    }, [userInfo])

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    async function getPendingRequests() {
        try{
        let response = await Axios.get("https://tangerinemusic.herokuapp.com/pendingrequests", {
            headers: {
                "Authorization": ' Bearer ' + userInfo.access_token
              }
        });
        let temp = [];
        response.data.map(e=>{
            temp.push({name: e.from_user_name, id: e.from_user_id});
        });
        setRequests(temp);
        }catch(error){
          console.log(error.response);
        }
      }

      async function getFriendLists() {
        try{
        
        let response = await Axios.get("https://tangerinemusic.herokuapp.com/friendlist", {
            headers: {
                "Authorization": ' Bearer ' + userInfo.access_token
              }
        });
        let temp = [];
        response.data.map(e=>{
            if(e.user1_id==userInfo.user_id){
                if(onlineFriends.includes(e.user2_name)){
                    temp.push({name: e.user2_name, online: true});
                }else{
                    temp.push({name: e.user2_name, online: false});
                }
            }else{
                if(onlineFriends.includes(e.user1_name)){
                    temp.push({name: e.user1_name, online: true});
                }else{
                    temp.push({name: e.user1_name, online: false});
                }
            }
        });
        setFriends(temp);
        }catch(error){
          console.log(error.response);
        }
      }

      async function acceptFriend(id) {
        try{
        let response = await Axios.post("https://tangerinemusic.herokuapp.com/acceptrequest/"+id, {}, {
            headers: {
                "Authorization": ' Bearer ' + userInfo.access_token
              }
        });
        getPendingRequests();
        }catch(error){
          console.log(error.response);
        }
      }

      const startChat = (name) => {
        setCurrent(name);
      }

      const submitMessage = () =>{
        if(!onlineFriends.includes(current)){
          alert("This friend is not online currently.");
        }else{
          props.socket.emit('private_message', {'to' : current, 'message' : message, 'from': userInfo.username});
        }
        setMessage("");
      }

  return(
    <div style={{minHeight:"562px",marginTop:"80px"}} className={classes.root}>
        <div style={{marginLeft:"130px", marginTop:"120px", marginRight:"130px"}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Pending Friend Requests</Typography>
          <Badge badgeContent={requests.length} color="primary" style={{ display: "flex", marginLeft: "auto" }}>
          <NotificationsIcon/>
          </Badge>
        </AccordionSummary>
        <AccordionDetails>
        <Grid item xs={12}>
        <List>
            {requests.map(e=>
            <ListItem button key="RemySharp">
            <ListItemIcon>
                <Avatar src="https://static.thenounproject.com/png/138580-200.png"/>
            </ListItemIcon>
            <ListItemText><Link to={`/profile/${e.id}`}>{e.name}</Link></ListItemText>
            <Button variant="contained" color="primary" align="right" onClick={()=>{acceptFriend(e.id)}}>Accept</Button>
            </ListItem>
            )}
        </List>
        </Grid>
        </AccordionDetails>
      </Accordion>
      </div>
      <div style={{marginLeft:"130px", marginRight:"130px"}}>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} onClick={getFriendLists}> 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
        <Typography className={classes.heading}>Chat</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <Divider />
                <List>
                    {friends.map(e=>
                    <ListItem onClick={()=>{startChat(e.name)}}>
                        <ListItemIcon>
                            {e.online?<ColoredCircle color="#34eb3a"/>:<ColoredCircle color="#A9A9A9"/>}
                        </ListItemIcon>
                        <ListItemText>{e.name}</ListItemText>
                    </ListItem>)}
                </List>
            </Grid>
            {current?
                <Grid item xs={9}>
                <List className={classes.messageArea}>
                <Navbar bg="light" variant="light">
                <Navbar.Brand>{current}</Navbar.Brand>
                </Navbar>
                    {messages.map(e=>
                        <ListItem key="1">{userInfo && e.from==userInfo.username && e.to==current?
                            <Grid container>
                            <Grid item xs={12} align="right">
                                <ListItemText>{e.date}</ListItemText>
                            </Grid>
                            <Grid item xs={12} align="right">
                                <ListItemText>{e.message}</ListItemText>
                            </Grid>
                            </Grid>:userInfo && e.from==current && e.to==userInfo.username?
                            <Grid container>
                            <Grid item xs={12} align="left">
                                <ListItemText>{e.date}</ListItemText>
                            </Grid>
                            <Grid item xs={12} align="left">
                                <ListItemText>{e.message}</ListItemText>
                            </Grid>
                            </Grid>:null}
                        </ListItem>)
                    }
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth value={message} name="message"
                        onChange={e => setMessage(e.target.value)}/>
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon onClick={submitMessage}/></Fab>
                    </Grid>
                </Grid>
                </Grid>:
                <Grid item xs={9}>
                    <Typography style={{textAlign:"center", marginTop:"200px"}} className={classes.heading}>
                        Select a friend who is online to start chatting
                    </Typography>
                </Grid>
                }
                </Grid>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
    );
    }

export default Inbox;