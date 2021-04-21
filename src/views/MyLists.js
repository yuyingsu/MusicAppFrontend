import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import CardList from "../components/CardList";
import Axios from "axios";

function MyLists() {
    const [mylists, setMyLists] = useState([]);
    const userSignInReducer = useSelector((state) => state.userSignin);
    const { userInfo } = userSignInReducer;
    const history = useHistory();

    useEffect(() => {
        MyLists();
    }, [])

    useEffect(() => {
        if(!userInfo){
          history.push('/signin');
        }
      }, [userInfo])

    async function MyLists() {
    try{
        let response = await Axios.get("https://tangerinemusic.herokuapp.com/mylist", {
            headers: {
                "Authorization": ' Bearer ' + userInfo.refresh_token
              }
        });
        console.log(response.data)
        let temp=[];
        response.data.lists.map((e)=>{
            temp.push({title: e.title, id: e.id})
        });
        setMyLists(temp);
        }catch(error){
          console.log(error.response);
        }
      }

    const res = mylists.map((e)=>
        <Col xs="4" className="d-flex justify-content-center align-items-center">
          <CardList title={e.title} id={e.id} private={true} mylist={MyLists}/>
        </Col>
    );

    return(
    <div style={{minHeight:"562px",marginTop:"80px"}}>
    <h1 style={{textAlign:"center", marginTop:"120px", fontSize:"35px", padding:"20px"}}>
        My Lists
    </h1>
    <Container fluid>
        <Row>
        {res}
        </Row>
    </Container>
    </div>
    );
}

export default MyLists;