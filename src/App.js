import { BrowserRouter, Route } from 'react-router-dom';
import {
  Lists, SignIn, SignUp, Home, UserProfile, CreateList, SingleList, HostEvent, MyLists, MyEvents, Events,
  Profile, Event, MyLikes, Explore, Inbox
 } from './views/';
 import {
  NavbarIndex, FooterPage
 } from './components/';
import HOC from './Hoc';
import { useEffect, useState } from 'react';
import { ADD_MESSAGE } from "./constants/messageConstants";
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

function App() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { userInfo } = userSignInReducer;
  const socket = io('https://tangerinemusic.herokuapp.com');  
  useEffect(() => {
    socket.on('new_private_message', function(msg) {
      const item = {
            date: new Date().toLocaleString(),
            message: msg['message'],
            from: msg['from'],
            to: msg['to']
        }
      dispatch({ type: ADD_MESSAGE, payload: item });
    });
    }, [])
  useEffect(() => {
    if(userInfo){
      socket.emit('join_chat', userInfo.username);
      setCurrent(userInfo.username);
    }
    else{
      socket.emit('leave_chat', current);
    }
  }, [userInfo])
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <NavbarIndex/>
        <Route exact path="/" component={HOC(Home)} />
        <Route exact path='/list/:id' exact render={({match}) =><SingleList id={match.params.id}/>}/>
        <Route exact path='/profile/:id' exact render={({match}) =><Profile id={match.params.id}/>}/>
        <Route exact path='/event/:id' exact render={({match}) =><Event id={match.params.id}/>}/>
        <Route exact path="/lists" component={HOC(Lists)} />
        <Route exact path="/events" component={HOC(Events)} />
        <Route exact path="/signin" component={HOC(SignIn)} />
        <Route exact path="/register" component={HOC(SignUp)} />
        <Route exact path="/profile" component={HOC(UserProfile)} />
        <Route exact path="/createlist" component={HOC(CreateList)} />
        <Route exact path="/hostevent" component={HOC(HostEvent)} />
        <Route exact path="/mylists" component={HOC(MyLists)} />
        <Route exact path="/mylikes" component={HOC(MyLikes)} />
        <Route exact path="/myevents" component={HOC(MyEvents)} />
        <Route exact path="/explore" component={HOC(Explore)} />
        <Route exact path="/inbox" component={HOC(props => <Inbox {...props} socket={socket} />)} />
        <FooterPage/>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
