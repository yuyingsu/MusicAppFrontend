import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link } from "react-router-dom";
import { getList } from "../actions/listActions";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Button } from '@material-ui/core';
import 'react-jinke-music-player/assets/index.css';
import Heart from "react-animated-heart";
import Axios from "axios";
import HOC from "../Hoc";

const useStyles = makeStyles((theme) => ({
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

function SingleList(props) {
  const dispatch = useDispatch();
  const singleListReducer = useSelector((state) => state.singleList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { list } = singleListReducer;
  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  
  useEffect(() => {
    dispatch(getList(props.id));
    isLike();
    userList();
  }, [like])

  async function isLike() {
    try{
    let response = await Axios.get("https://tangerinemusic.herokuapp.com/liked/"+props.id, {
      headers: {
        "Authorization": ' Bearer ' + userInfo.refresh_token
      }
    });
    response = await response.data
    setLike(response)
    }catch(error){
      console.log(error.response);
    }
  }

  async function likeList() {
    try{
    let response = await Axios.post("https://tangerinemusic.herokuapp.com/like/"+props.id, {}, {
      headers: {
        "Authorization": ' Bearer ' + userInfo.refresh_token
      }
    });
    setLike(true);
    }catch(error){
      console.log(error.response);
    }
  }

  async function unlikeList() {
    try{
    let response = await Axios.post("https://tangerinemusic.herokuapp.com/unlike/"+props.id, {}, {
      headers: {
        "Authorization": ' Bearer ' + userInfo.refresh_token
      }
    });
    setLike(false);
    }catch(error){
      console.log(error.response);
    }
  }

  async function userList() {
    try{
    let response = await Axios.get("https://tangerinemusic.herokuapp.com/likedlist/"+props.id, {}, {
    });
    let temp = [];
    response['data'].map((e)=>{
      temp.push({id:e['id'], username:e['username']});
    });
    setUsers(temp);
    }catch(error){
      console.log(error.response);
    }
  }

  const clickLike = () => {
    if(userInfo){
      if(!like){
      likeList();
    }else{
      unlikeList();
    }
    }else{
     alert("Please sign in first."); 
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let res = users.map((e)=> <ListItem>
                            <ListItemText style={{textAlign:"center"}}><Link to={`/profile/${e.id}`}>{e.username}</Link></ListItemText>
                            </ListItem>);
  return(
  <div style={{marginTop: "80px", height: "570px", marginLeft:"50px", marginRight:"50px", marginTop:"100px"}} >
        {list?<h1>{list.title}<div style={{float:"right"}} ><Heart isClick={like} onClick={clickLike}/></div></h1>:null}
        <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>Song Title</TableCell>
               <TableCell>Song Artist</TableCell>
               <TableCell>Play</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             { list ? list['songs'].map((elem) => (
               <TableRow key={elem.name}>
                 <TableCell>{elem.title}</TableCell>
                 <TableCell>{elem.artist}</TableCell>
                 <TableCell><PlayCircleFilledIcon onClick={(e)=>{setToggle(!toggle)}}/></TableCell>
               </TableRow>
             )):null}
           </TableBody>
         </Table>
       </TableContainer>
       <div style={{marginTop:"20px"}}> <Button variant="primary" onClick={handleOpen} style={{fontSize:"12px"}}>{users.length} Likes</Button></div>
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransitione
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
       >
       <Fade in={open}>
          <div className={classes.paper} style={{width:"500px", height:"500px", textAlign:"center"}}>
            Who liked this playlist:
          <List>
          {res}
          </List>
          </div>
        </Fade>
       </Modal>
  </div>)
};

export default HOC(SingleList);