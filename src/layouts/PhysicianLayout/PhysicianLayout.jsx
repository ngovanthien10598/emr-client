import React from 'react';
import { Link, Redirect, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  IdcardOutlined,
  CalendarOutlined,
  ContainerOutlined,
  ProfileOutlined,
  NotificationOutlined} from '@ant-design/icons';
import NotificationPage from 'pages/common/notification/notification';
import VisitPage from 'pages/common/visit/visit';
import PatientPage from 'pages/common/patient/patient';
import AppointmentPage from 'pages/common/appointment/apointment';
import withPrivateRoute from 'HOCs/withPrivateRoute';
import CustomHeader from 'components/Header';
import ExaminationPage from 'pages/common/examination/examination';
import ProfilePage from 'pages/common/profile/profile';
import PatientDetails from 'pages/common/patient/patient-details';
import EmrDetailsPage from 'pages/common/patient/emr-details';

const { Sider, Content } = Layout;

const PhysicianLayout = () => {
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
            <Menu.Item key="/physician/visit" icon={<ContainerOutlined />}>
              <Link to="/physician/visit">Khám bệnh</Link>
            </Menu.Item>
            <Menu.Item key="/physician/patient" icon={<IdcardOutlined />}>
              <Link to="/physician/patient">Bệnh nhân</Link>
            </Menu.Item>
            <Menu.Item key="/physician/appointment" icon={<CalendarOutlined />}>
              <Link to="/physician/appointment">Lịch hẹn</Link>
            </Menu.Item>
            <Menu.Item key="/physician/profile" icon={<ProfileOutlined />}>
              <Link to="/physician/profile">Hồ sơ</Link>
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

              {/* Visit */}
              <Route path={`${path}/visit`} exact>
                <VisitPage />
              </Route>

              <Route path={`${path}/visit/:emr`}>
                <ExaminationPage />
              </Route>

              {/* Patient */}
              <Route path={`${path}/patient`} exact>
                <PatientPage />
              </Route>
              
              <Route path={`${path}/patient/:patientId`} exact>
                <PatientDetails />
              </Route>

              <Route path={`${path}/patient/:patientId/:emrId`}>
                <EmrDetailsPage />
              </Route>

              {/* Appointment */}
              <Route path={`${path}/appointment`}>
                <AppointmentPage />
              </Route>

              <Route path={`${path}/profile`}>
                <ProfilePage />
              </Route>

              {/* Fallback */}
              <Redirect to={`/physician/visit`} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withPrivateRoute(PhysicianLayout, ['physician']);