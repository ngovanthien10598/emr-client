import React, { ReactNode } from 'react';
import { Link, Redirect, useHistory, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, Modal } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
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
  NotificationOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
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
import WorkingHourPage from 'pages/common/working-hour/working-hour';
import RoomPage from 'pages/common/room/room';
import AdminAccountPage from 'pages/admin/account';
import AdminSettingPage from 'pages/admin/setting';
import { useDispatch, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import { logout } from 'store/actions/user.action';
import withPrivateRoute from 'HOCs/withPrivateRoute';

const { Header, Sider, Content } = Layout;
const { Item, SubMenu, Divider } = Menu;
const { confirm } = Modal;

const AdminLayout = (props) => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const path = match.path;
  const user = useSelector((state) => state.userState.user);

  function handleLogout() {
    Modal.confirm({
      title: "Đăng xuất",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc muốn đăng xuất không?",
      async onOk() {
        await dispatch(logout());
        history.replace('/login');
      }
    })
  }

  return (
    <Layout>
      <Header className="header flex items-center">
        <Link to="/" className="text-2xl text-white">EMR</Link>
        <div className="ml-auto"></div>
        <Button type="default" ghost icon={<UserOutlined />} className="border-none">{user?.first_name} {user?.last_name}</Button>
        <Button type="default" ghost icon={<LogoutOutlined />} className="border-none" onClick={handleLogout}>Đăng xuất</Button>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
              <Link to="/admin/dashboard">Bảng điều khiển</Link>
            </Menu.Item>
            <SubMenu key="drug" icon={<MedicineBoxOutlined />} title="Quản lý thuốc">
              <Menu.Item key="/admin/drug/category">
                <Link to="/admin/drug/category">Loại thuốc</Link>
              </Menu.Item>
              <Menu.Item key="/admin/drug/unit">
                <Link to="/admin/drug/unit">Đơn vị tính</Link>
              </Menu.Item>
              <Menu.Item key="/admin/drug">
                <Link to="/admin/drug">Thuốc</Link>
              </Menu.Item>
              <Menu.Item key="/admin/drug/instruction">
                <Link to="/admin/drug/instruction">Sử dụng</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="disease" icon={<BugOutlined />} title="Quản lý bệnh">
              <Menu.Item key="/admin/disease/category">
                <Link to="/admin/disease/category">Loại bệnh</Link>
              </Menu.Item>
              <Menu.Item key="/admin/disease">
                <Link to="/admin/disease">Bệnh</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/admin/notification" icon={<NotificationOutlined />}>
              <Link to="/admin/notification">Thông báo</Link>
            </Menu.Item>
            <Menu.Item key="/admin/visit" icon={<ContainerOutlined />}>
              <Link to="/admin/visit">Khám chữa bệnh</Link>
            </Menu.Item>
            <Menu.Item key="/admin/patient" icon={<IdcardOutlined />}>
              <Link to="/admin/patient">Bệnh nhân</Link>
            </Menu.Item>
            <Menu.Item key="/admin/appointment" icon={<CalendarOutlined />}>
              <Link to="/admin/appointment">Lịch hẹn</Link>
            </Menu.Item>
            <Menu.Item key="/admin/service" icon={<DollarOutlined />}>
              <Link to="/admin/service">Dịch vụ</Link>
            </Menu.Item>

            <Menu.Item key="/admin/working-hour" icon={<ClockCircleOutlined />}>
              <Link to="/admin/working-hour">Giờ làm việc</Link>
            </Menu.Item>
            <Menu.Item key="/admin/room" icon={<AppstoreOutlined />}>
              <Link to="/admin/room">Phòng</Link>
            </Menu.Item>

            <Menu.Item key="/admin/account" icon={<UserOutlined />}>
              <Link to="/admin/account">Tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="/admin/setting" icon={<SettingOutlined />}>
              <Link to="/admin/setting">Cài đặt</Link>
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
              <Route path={`${path}/visit`}>
                <VisitPage />
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

              {/* Service */}
              <Route path={`${path}/working-hour`}>
                <WorkingHourPage />
              </Route>

              {/* Room */}
              <Route path={`${path}/room`}>
                <RoomPage />
              </Route>

              {/* Room */}
              <Route path={`${path}/account`}>
                <AdminAccountPage />
              </Route>

              {/* Room */}
              <Route path={`${path}/setting`}>
                <AdminSettingPage />
              </Route>

              {/* Fallback */}
              <Redirect to={`/admin/dashboard`} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withPrivateRoute(AdminLayout, ['admin']);