import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { allEvents } from "../actions/eventActions";
import Pagination from '@material-ui/lab/Pagination';
import CardEvent from "../components/CardEvent.js";
import SearchBar from "material-ui-search-bar";

function Events(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const allEventReducer = useSelector((state) => state.allEvent);
  const { events,count } = allEventReducer;

  useEffect(() => {
    dispatch(allEvents(page,searchTerm));
  }, [page])

  const fetch = (searchTerm) => {
    console.log(searchTerm);
    setPage(1);
    dispatch(allEvents(page, searchTerm));
  }
  
  
  const handleChange = (event, value) => {
    setPage(value);
  };

  let res = null;
  if(events){
    res = events['events'].map((event,idx) => (
      <Col xs="4" className="d-flex justify-content-center align-items-center">
          <CardEvent key={idx} headline={event.headline} id={event.id} name={event.users[0]?event.users[0].username:"no one"} user_id = {event.users[0]?event.users[0].id:null} date = {event.date.substring(0,19)}/>
      </Col>));
  }
  console.log(count);
  return(
  <div style={{marginTop: "80px", height:"820px"}}>
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center">
        <SearchBar
        style={{marginTop:"30px", marginBottom:"30px"}}
        value={searchTerm}
        onChange={(newValue) => setSearchTerm(newValue)}
        onRequestSearch={(searchTerm) => fetch(searchTerm)}
        />
        </Row>
        <Row>
          {res}
        </Row>  
        <Row style={{marginTop:"50px"}}  className="d-flex justify-content-center align-items-center">
        <Pagination  count={Math.ceil(count/6)} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
        </Row>
      </Container>
  </div>)
  }

export default Events;
