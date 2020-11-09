import React, { useEffect } from 'react';
import { Route, HashRouter as Router, Switch, Redirect  } from 'react-router-dom';
import LoginPage from 'pages/login';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import PhysicianLayout from 'layouts/PhysicianLayout/PhysicianLayout';
import ReceptionistLayout from 'layouts/ReceptionistLayout/ReceptionistLayout';
import setupInterceptor from 'utils/interceptor';
import { useDispatch } from 'react-redux';
import { getProfileAction } from 'store/actions/user.action';
import { refreshToken } from 'services/auth/auth.service';

// import "normalize.css/normalize.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'antd/dist/antd.css';
import 'styles/main.scss';
import VerifyPage from 'pages/verify-email';


function App() {

  setupInterceptor();

  const dispatch = useDispatch();

  function fetchProfile() {
    try {
      const token = Cookie.get('EMR_token');
      if (token && jwtDecode(token)) {
        dispatch(getProfileAction());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkRefresh() {
    try {
      const token = Cookie.get('EMR_token');
      const refresh = Cookie.get('EMR_refresh');
      if (!token && refresh) {
        const newTokenReponse = await refreshToken(refresh);
        const newToken = newTokenReponse.data;
        Cookie.set('EMR_token', newToken.access_token, { expires: 3/24 });
      }
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkRefresh();
  });
  
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/verify-email" component={VerifyPage} />

          <Route path="/admin" component={AdminLayout} />
          <Route path="/physician" component={PhysicianLayout} />
          <Route path="/receptionist" component={ReceptionistLayout} />

          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
