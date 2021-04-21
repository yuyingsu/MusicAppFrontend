import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { allLists } from "../actions/listActions";
import Pagination from '@material-ui/lab/Pagination';
import CardList from "../components/CardList";
import SearchBar from "material-ui-search-bar";

function Lists(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const allListReducer = useSelector((state) => state.allList);
  const { lists,count } = allListReducer;

  useEffect(() => {
    dispatch(allLists(page,searchTerm));
  }, [page])

  const fetch = (searchTerm) => {
    console.log(searchTerm);
    setPage(1);
    dispatch(allLists(page,searchTerm));
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  let res = null;
  if(lists){
    res = lists['lists'].map((list) => (
      <Col xs="4" className="d-flex justify-content-center align-items-center">
          <CardList title={list.title} id={list.id} user_id = {list.user_id}/>
      </Col>));
  }
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

export default Lists;