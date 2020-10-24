import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Layout, Modal } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/actions/user.action';

const { Header } = Layout;

const CustomHeader = () => {

  const dispatch = useDispatch();
  const history = useHistory();
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
    <Header className="header flex items-center">
      <div className="text-2xl text-white">EMR</div>
      <div className="ml-auto"></div>
      <Button type="default" ghost icon={<UserOutlined />} className="border-none">{user?.first_name} {user?.last_name}</Button>
      <Button type="default" ghost icon={<LogoutOutlined />} className="border-none" onClick={handleLogout}>Đăng xuất</Button>
    </Header>
  )
}

export default CustomHeader;