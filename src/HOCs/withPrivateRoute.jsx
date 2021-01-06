import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'store/actions/auth.action';
import jwtDecode from 'jwt-decode';
import { notification } from 'antd';

const withPrivateRoute = (Child, roles) => {
  const WrapperComponent = (props) => {

    const dispatch = useDispatch();
    const token = Cookie.get('EMR_token');
    const user = useSelector((state) => state.userState.user);

    function isValidRole(user) {
      const userRole = user?.role.name;
      const isValid = roles.includes(userRole);
      return isValid;
    }

    useEffect(() => {
      if (user && user.role) {
        if (!isValidRole(user)) {
          notification.error({ message: "Lỗi", description: "Trang bạn yêu cầu không hợp lệ", type: "error" });
          dispatch(logoutAction());
        }
      }
    }, [user, dispatch]);

    try {
      if (!token || token.length === 0 || !jwtDecode(token)) {
        return <Redirect to="/login" />;
      } else {
        return <Child {...props} />
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return WrapperComponent;
}

export default withPrivateRoute;