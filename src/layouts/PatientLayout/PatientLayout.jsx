import React from 'react';
import { Link, Redirect, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import withPrivateRoute from 'HOCs/withPrivateRoute';
import CustomHeader from 'components/Header';
import ProfilePage from 'pages/common/profile/profile';
import PatientEmrPage from 'pages/patient/emr';
import PatientEmrDetailsPage from 'pages/patient/patient-emr-details';

const { Sider, Content } = Layout;

const PatientLayout = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const path = match.path;

  return (
    <Layout>
      <CustomHeader />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/patient/emr" icon={<DashboardOutlined />}>
              <Link to="/patient/emr">Bệnh án</Link>
            </Menu.Item>

            <Menu.Item key="/patient/profile" icon={<UserOutlined />}>
              <Link to="/patient/profile">Hồ sơ</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              {/* Dashboard */}
              <Route path={`${path}/emr`} exact>
                <PatientEmrPage />
              </Route>

              <Route path={`${path}/emr/:emrId`}>
                <PatientEmrDetailsPage />
              </Route>

              <Route path={`${path}/profile`}>
                <ProfilePage />
              </Route>

              {/* Fallback */}
              <Redirect to={`/patient/emr`} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withPrivateRoute(PatientLayout, ['patient']);