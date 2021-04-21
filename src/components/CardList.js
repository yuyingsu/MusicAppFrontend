import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from "axios";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    height:280,
    marginBottom: 20
  },
});

export default function CardList(props) {
  const classes = useStyles();
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { userInfo } = userSignInReducer;

  const [name, setName] = useState("");
  useEffect(() => {
    getAuthor()
  }, [])

  async function getAuthor() {
    try{
        let response = await Axios.get("https://tangerinemusic.herokuapp.com/userprofile/"+props.user_id, {},{});
        setName(response.data.username);
        }catch(error){
          console.log(error.response);
        }
      }
  
    async function deleteList(){
        let response = await Axios.delete("https://tangerinemusic.herokuapp.com/list/"+props.id, {
            headers: {
                "Authorization": ' Bearer ' + userInfo.access_token
              }
        });
        props.mylist();
    }


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="110"
          image="https://i.pinimg.com/originals/2d/1d/1b/2d1d1be4885faf57c86bc4f306e9d805.jpg"
        />
        <CardContent>
          {props.title.length>23?
          <Typography gutterBottom variant="h6">
          {props.title}
          </Typography>:
          <Typography gutterBottom variant="h5">
          {props.title}
          </Typography>
          }
          {props.user_id && <Typography gutterBottom variant="h7">
          Author: <Link to={`/profile/${props.user_id}`}>{name}</Link>
          </Typography>}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/list/${props.id}`}>Show List</Link>
        { props.private && <Button variant="contained" color="secondary" style={{marginLeft:"120px"}} 
            onClick={deleteList}>Delete</Button>
        }
      </CardActions>
    </Card>
  );
}
