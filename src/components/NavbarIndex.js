import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions.js';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { userPic } from '../actions/userActions';
import { useEffect } from 'react';

const attributes = {
  background: "black",
  zIndex: "5",
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  height: "80px"
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const NavbarIndex = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const getPicReducer = useSelector((state) => state.userPic);
  const { pic } = getPicReducer;
  const dispatch = useDispatch();
  const classes = useStyles();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if(userInfo){
      dispatch(userPic(userInfo.user_id));
    }
}, [])

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  let path=null;
  if(pic)
  {
    path = "https://tangerinemusic.herokuapp.com/"+pic.replaceAll("\\","/");
    console.log(path);
  } 

  return (
    <div>
      <Navbar style={attributes} className="navbar top navbar-expand-md navbar-light bg-faded">
        <NavbarBrand href="/" style={{color: "#e67e22", fontSize: "40px", marginBottom: "10px"}}>Tangerine</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{fontSize: "18px"}}>
            <NavItem>
              <NavLink href="/lists" style={{color: "#F08080"}}>Playlist</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/events" style={{color: "#F08080"}}>Event</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/explore" style={{color: "#F08080"}}>Explore</NavLink>
            </NavItem>
            <NavItem>
              {userInfo ? <NavLink tag={Link} to="/profile" style={{color: "#F08080"}}>Profile</NavLink> : null}
            </NavItem>
          </Nav>
          <Nav style={{fontSize: "18px"}}>
            <NavItem>
              {!userInfo ? <NavLink tag={Link} to="/signin" style={{color: "#F08080"}}>Sign In</NavLink>:null}
            </NavItem>
          </Nav>
          {userInfo && <Nav>
          <UncontrolledDropdown nav inNavbar style={{marginTop:"28px"}}>
              <DropdownToggle nav caret>
              {path?<Avatar src={path} className={classes.small} />:
              <Avatar src="/static/images/avatar/1.jpg" className={classes.small} />}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                <NavLink tag={Link} to="/inbox">Inbox</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <NavItem>
                <NavLink tag={Link} to="/" onClick={(e)=>{handleLogout(e)}}>Logout</NavLink>
                </NavItem>
                </DropdownItem>
              </DropdownMenu>
          </UncontrolledDropdown>
          </Nav>}
          </Collapse>
          <NavbarText style={{color: "#F08080", fontSize: "18px", marginRight:"40px"}}>
            {userInfo ? userInfo.username:("Guest")}
          </NavbarText>
      </Navbar>
    </div>
  );
}

export default NavbarIndex
