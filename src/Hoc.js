import React from 'react';
import { logout } from './actions/userActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export default function(ComposedClass){
    class Component extends React.Component {
      constructor(props) {
        super(props);
        let time = Number.POSITIVE_INFINITY;
        if(this.props.userInfo){
          let decodedToken = jwt_decode(this.props.userInfo.access_token);
          let currentDate = new Date();
          time = decodedToken.exp * 1000 - currentDate.getTime();
        }
        this.state = {
          warningTime: time-1000*60,
          signoutTime: time
        };
      }

      componentDidMount() {
        this.setTimeout();
      }

      setTimeout = () => {
        console.log(this.state.signoutTime)
        if(this.state.warningTime>0){
          this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
        }
        if(this.state.signoutTime>0){
          this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
        }else{
          this.logout();
        }
      };

      warn = () => {
        if(this.props.userInfo){
            alert('Session Timeout. Your session is about to expire in 1 minute.');
        }
      };

      logout = () => {
          console.log(this.props.userInfo);
          if(this.props.userInfo){
            this.props.logout();
            <Redirect to='/signin' />
          }
      };

      render() {

        return (
          <div>
            <ComposedClass {...this.props} />
          </div>
        );

      }
    }
    return connect(mapStateToProps, mapDispatchToProps)(Component)
}


const mapStateToProps = state => {
    return {
        userInfo: state.userSignin.userInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};