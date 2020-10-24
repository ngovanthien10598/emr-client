import React, { useEffect } from 'react';
import { Route, HashRouter as Router, Switch, Redirect  } from 'react-router-dom';
import LoginPage from 'pages/login';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import setupInterceptor from 'utils/interceptor';
import { useDispatch } from 'react-redux';
import { getProfileAction } from 'store/actions/user.action';

// import "normalize.css/normalize.css";
// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'antd/dist/antd.css';
import 'styles/main.scss';

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

  useEffect(() => {
    fetchProfile();
  });
  
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
