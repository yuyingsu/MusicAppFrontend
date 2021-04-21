import React from "react";
import CreateSong from "./CreateSong";
import { createList } from '../actions/listActions';
import Sidebar from "../components/Sidebar";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Form } from 'react-bootstrap';
import { Col } from 'reactstrap';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function CreateList() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(1);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!userInfo){
      history.push('/signin');
    }
  }, [userInfo])


  const addSong = (title, artist) => {
    const song = {
      title: title,
      artist: artist,
      id: id
    }
    setId(id+1);
    const newSongs = [...songs];
    newSongs.push(song);
    setSongs(newSongs);
    console.log(newSongs);
  }

  const submitList = (e) => {
    e.preventDefault();
    songs.map(elem=>{delete elem.id});
    dispatch(createList(title,songs));
    history.go(-1);
  }
  
  const columns = [{ field: 'title', headerName: 'Song Name', width: 590 },
  { field: 'artist', headerName: 'Song Title', width: 590 }]

  return(
   <div className="app">
   <div style={{marginTop:"80px", height:"562px"}} >
   <Sidebar/>
   </div>
   <main className="btn-toggle">
      <h3>Create Your List:</h3>
      <div>
      <Form>
      <Form.Row>
          <Col>
          Title
          <Form.Control placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
          </Col>
        </Form.Row>
        </Form> 
      </div>
      <div>
      <CreateSong addSong={addSong}/>
      </div>
   <DataGrid rows={songs} columns={columns} pageSize={3}/>
   <Grid container justify="flex-end">
   <Button variant="primary" type="submit" onClick={submitList} style={{width:"120px"}}>Submit</Button>
   </Grid>
   </main>
   </div>
  );
  }

export default CreateList;