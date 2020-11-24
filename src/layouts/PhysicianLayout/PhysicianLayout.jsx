import React from 'react';
import { Link, Redirect, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  MedicineBoxOutlined,
  BugOutlined,
  DollarOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  ContainerOutlined,
  SettingOutlined,
  NotificationOutlined} from '@ant-design/icons';
import AdminDashboard from 'pages/admin/dashboard';
import DrugCategoryPage from 'pages/common/drug/drug-category';
import DrugUnitPage from 'pages/common/drug/drug-unit';
import DrugPage from 'pages/common/drug/drug';
import DrugInstructionPage from 'pages/common/drug/drug-instruction';
import DiseaseCategory from 'pages/common/disease/disease-category';
import DiseasePage from 'pages/common/disease/disease';
import NotificationPage from 'pages/common/notification/notification';
import VisitPage from 'pages/common/visit/visit';
import PatientPage from 'pages/common/patient/patient';
import AppointmentPage from 'pages/common/appointment/apointment';
import ServicePage from 'pages/common/service/service';
import RoomPage from 'pages/common/room/room';
import AdminAccountPage from 'pages/admin/account';
import AdminSettingPage from 'pages/admin/setting';
import withPrivateRoute from 'HOCs/withPrivateRoute';
import CustomHeader from 'components/Header';
import ExaminationPage from 'pages/common/examination/examination';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

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
            <Menu.Item key="/physician/dashboard" icon={<DashboardOutlined />}>
              <Link to="/physician/dashboard">Bảng điều khiển</Link>
            </Menu.Item>
            <SubMenu key="drug" icon={<MedicineBoxOutlined />} title="Quản lý thuốc">
              <Menu.Item key="/physician/drug/category">
                <Link to="/physician/drug/category">Loại thuốc</Link>
              </Menu.Item>
              <Menu.Item key="/physician/drug/unit">
                <Link to="/physician/drug/unit">Đơn vị tính</Link>
              </Menu.Item>
              <Menu.Item key="/physician/drug">
                <Link to="/physician/drug">Thuốc</Link>
              </Menu.Item>
              <Menu.Item key="/physician/drug/instruction">
                <Link to="/physician/drug/instruction">Hướng dẫn sử dụng</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="disease" icon={<BugOutlined />} title="Quản lý bệnh">
              <Menu.Item key="/physician/disease/category">
                <Link to="/physician/disease/category">Loại bệnh</Link>
              </Menu.Item>
              <Menu.Item key="/physician/disease">
                <Link to="/physician/disease">Bệnh</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/physician/notification" icon={<NotificationOutlined />}>
              <Link to="/physician/notification">Thông báo</Link>
            </Menu.Item>
            <Menu.Item key="/physician/visit" icon={<ContainerOutlined />}>
              <Link to="/physician/visit">Khám bệnh</Link>
            </Menu.Item>
            <Menu.Item key="/physician/patient" icon={<IdcardOutlined />}>
              <Link to="/physician/patient">Bệnh nhân</Link>
            </Menu.Item>
            <Menu.Item key="/physician/appointment" icon={<CalendarOutlined />}>
              <Link to="/physician/appointment">Lịch hẹn</Link>
            </Menu.Item>
            <Menu.Item key="/physician/service" icon={<DollarOutlined />}>
              <Link to="/physician/service">Dịch vụ</Link>
            </Menu.Item>

            <Menu.Item key="/physician/room" icon={<AppstoreOutlined />}>
              <Link to="/physician/room">Phòng</Link>
            </Menu.Item>

            <Menu.Item key="/physician/account" icon={<UserOutlined />}>
              <Link to="/physician/account">Tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="/physician/setting" icon={<SettingOutlined />}>
              <Link to="/physician/setting">Cài đặt</Link>
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
              <Route path={`${path}/dashboard`}>
                <AdminDashboard />
              </Route>

              {/* Drug */}
              <Route path={`${path}/drug/category`}>
                <DrugCategoryPage />
              </Route>
              <Route path={`${path}/drug/unit`}>
                <DrugUnitPage />
              </Route>
              <Route path={`${path}/drug`} exact>
                <DrugPage />
              </Route>
              <Route path={`${path}/drug/instruction`}>
                <DrugInstructionPage />
              </Route>

              {/* Disease */}
              <Route path={`${path}/disease/category`}>
                <DiseaseCategory />
              </Route>
              <Route path={`${path}/disease`}>
                <DiseasePage />
              </Route>

              {/* Notification */}
              <Route path={`${path}/notification`}>
                <NotificationPage />
              </Route>

              {/* Visit */}
              <Route path={`${path}/visit`} exact>
                <VisitPage />
              </Route>

              <Route path={`${path}/visit/examination`}>
                <ExaminationPage />
              </Route>

              {/* Patient */}
              <Route path={`${path}/patient`}>
                <PatientPage />
              </Route>

              {/* Appointment */}
              <Route path={`${path}/appointment`}>
                <AppointmentPage />
              </Route>

              {/* Service */}
              <Route path={`${path}/service`}>
                <ServicePage />
              </Route>

              {/* Room */}
              <Route path={`${path}/room`}>
                <RoomPage />
              </Route>

              {/* Account */}
              <Route path={`${path}/account`}>
                <AdminAccountPage />
              </Route>

              {/* Room */}
              <Route path={`${path}/setting`}>
                <AdminSettingPage />
              </Route>

              {/* Fallback */}
              <Redirect to={`/physician/dashboard`} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withPrivateRoute(PhysicianLayout, ['physician']);