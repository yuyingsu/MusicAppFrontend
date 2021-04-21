import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import CardList from "../components/CardList";
import Axios from "axios";

function MyLikes() {

    const [lists, setLists] = useState([]);
    const userSignInReducer = useSelector((state) => state.userSignin);
    const { userInfo } = userSignInReducer;
    const history = useHistory();
    
    useEffect(() => {
        MyLikes();
    }, [])

    useEffect(() => {
        if(!userInfo){
          history.push('/signin');
        }
      }, [userInfo])

    async function MyLikes() {
    try{
        let response = await Axios.get("https://tangerinemusic.herokuapp.com/mylike/"+userInfo.user_id, {},{});
        console.log(response.data)
        let temp=[];
        response.data.map((e)=>{
            temp.push({title: e.title, id: e.id, user_id: e.user_id})
        });
        setLists(temp);
        console.log(lists[0])
        }catch(error){
          console.log(error.response);
        }
      }

    const res = lists.map((e)=>
        <Col xs="4" className="d-flex justify-content-center align-items-center">
        <CardList title={e.title} id={e.id} user_id={e.user_id}/>
        </Col>
    );

    return(
    <div style={{minHeight:"562px",marginTop:"80px"}}>
    <h1 style={{textAlign:"center", marginTop:"120px", fontSize:"35px", padding:"20px"}}>
        Lists that I liked
    </h1>
    <Container fluid>
    <Row>
    {res}
    </Row>
    </Container> 
    </div>
    );
}

export default MyLikes;