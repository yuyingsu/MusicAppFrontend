import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createEvent } from '../actions/eventActions';
import { Form, Button } from 'react-bootstrap';
import { Col } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';

function HostEvent() {
  const [description, setDescription] = useState("");
  const [headline, setHeadline] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [time, setTime] = useState(new Date());
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { userInfo } = userSignInReducer;
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!userInfo){
      history.push('/signin');
    }
  }, [userInfo])

  const submitEvent = (e) => {
    e.preventDefault();
    let timeInFormat = JSON.stringify(time);
    dispatch(createEvent(streetName, city, state, zip, headline, description, timeInFormat.substring(1,timeInFormat.length-1), userInfo.user_id));
    history.go(-1);
  }

  return(
   <div className="app">
   <div style={{marginTop:"80px", height:"562px"}}>
      <Sidebar/>
   </div>
   <main className="btn-toggle">
      <h3>Create Your Event:</h3>
      <Form>
          <Form.Group>
          <Form.Label>Headline</Form.Label>
          <Form.Control type="text" placeholder="Enter headline" onChange={(e)=>{setHeadline(e.target.value)}} value={headline}/>
          <Form.Text>
          </Form.Text>
          </Form.Group>
          <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
          </Form.Group>
          <Form.Group>
          <Form.Label >Street Name</Form.Label>
          <Form.Control type="text" placeholder="Street Name" onChange={(e)=>{setStreetName(e.target.value)}} value={streetName}/>
          </Form.Group>
          <Form.Row>
          <Col xs={7}>
          City
          <Form.Control placeholder="City" onChange={(e)=>{setCity(e.target.value)}} value={city}/>
          </Col>
          <Col>
          State
          <Form.Control placeholder="State" onChange={(e)=>{setState(e.target.value)}} value={state}/>
          </Col>
          <Col>
          Zip
          <Form.Control placeholder="Zip" onChange={(e)=>{setZip(e.target.value)}} value={zip}/>
          </Col>
          </Form.Row>
          <Form.Row style={{marginTop:"20px",marginBottom:"20px"}}>
          <Col>
          <DateTimePicker onChange={setTime} value={time}/>
          </Col>
          </Form.Row>
          <Button variant="primary" type="submit" onClick={submitEvent}>
              Submit
          </Button>
      </Form>
   </main>
   </div>
  );
  }

export default HostEvent;