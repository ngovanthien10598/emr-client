import React from 'react';
import Cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/actions/user.action';
const jwtDecode = require('jwt-decode');

const withPrivateRoute = (Child, roles) => {
  const WrapperComponent = (props) => {

    const dispatch = useDispatch();
    const token = Cookie.get('EMR_token');
    const user = useSelector((state) => state.userState.user);

    function isValidRole() {
      const userRole = user.role.name;
      const isValid = roles.includes(userRole);
      console.log(isValid);
      return isValid;
    }

    try {
      if (!token || token.length === 0 || !jwtDecode(token)) {
        return <Redirect to="/login" />;
      } else if (!isValidRole()) {
        dispatch(logout());
        return <Redirect to="/login" />
      }
      
    } catch (error) {
      console.log(error);
    }

    return <Child {...props} />
  }

  return WrapperComponent;
}

export default withPrivateRoute;