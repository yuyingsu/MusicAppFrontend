import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Col } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch',
    },
  },
}));

export default function CreateSong(props) {
  const classes = useStyles();
  const [title, setTitle] = useState('Name');
  const [artist, setArtist] = useState('Artist');

  const submitHandler = (e) => {
    e.preventDefault();
    setArtist("");
    setTitle("");
    props.addSong(title,artist);
  }

  return (
      <div style={{marginTop:"20px", marginBottom:"20px"}}>
      <Form>
      <Form.Row>
          <Col>
          Name
          <Form.Control placeholder="Song Name" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
          </Col>
          <Col>
          Artist
          <Form.Control placeholder="Song Artist" onChange={(e)=>{setArtist(e.target.value)}} value={artist}/>
          </Col>
          <Col>
          <Button variant="outlined" style={{marginTop:"22px"}} onClick={(e) =>{submitHandler(e)}}>Add</Button> 
          </Col>
        </Form.Row>
        </Form> 
      </div>
  );
}
