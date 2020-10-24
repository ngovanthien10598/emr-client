import React, { useEffect } from 'react';
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import LoginPage from 'pages/login';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

// import "normalize.css/normalize.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'antd/dist/antd.css';
import 'styles/main.scss';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import setupInterceptor from 'utils/interceptor';
import * as UserService from 'services/auth/user.service';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/actions/user.action';

function App() {

  const dispatch = useDispatch();

  setupInterceptor();

  async function fetchProfile() {
    try {
      const token = Cookie.get('EMR_token');
      if (token && jwtDecode(token)) {
        const profileRes = await UserService.getProfile();
        dispatch(setUser(profileRes.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);
  
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/admin" component={AdminLayout} />

          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
