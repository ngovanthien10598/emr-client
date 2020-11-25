import React from 'react';
import { Link, Redirect, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import AppointmentPage from 'pages/common/appointment/apointment';
import withPrivateRoute from 'HOCs/withPrivateRoute';
import CustomHeader from 'components/Header';
import ReceivePage from 'pages/receptionist/receive';
import ProfilePage from 'pages/common/profile/profile';

const { Sider, Content } = Layout;

const ReceptionistLayout = () => {
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
            <Menu.Item key="/receptionist/receive" icon={<DashboardOutlined />}>
              <Link to="/receptionist/receive">Tiếp đón</Link>
            </Menu.Item>
            <Menu.Item key="/receptionist/appointment" icon={<CalendarOutlined />}>
              <Link to="/receptionist/appointment">Lịch hẹn</Link>
            </Menu.Item>

            <Menu.Item key="/receptionist/profile" icon={<UserOutlined />}>
              <Link to="/receptionist/profile">Hồ sơ</Link>
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
              <Route path={`${path}/receive`}>
                <ReceivePage />
              </Route>

              {/* Appointment */}
              <Route path={`${path}/appointment`}>
                <AppointmentPage />
              </Route>

              <Route path={`${path}/profile`}>
                <ProfilePage />
              </Route>

              {/* Fallback */}
              <Redirect to={`/receptionist/receive`} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withPrivateRoute(ReceptionistLayout, ['receptionist']);