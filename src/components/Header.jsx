import React from 'react';
import { Button, Layout, Modal, Spin, Space, Avatar } from 'antd';
import {
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from 'store/actions/auth.action';
import { ROLES } from 'constant/roles';

const { Header } = Layout;

const CustomHeader = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  function handleLogout() {
    Modal.confirm({
      title: "Đăng xuất",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc muốn đăng xuất không?",
      onOk() {
        dispatch(logoutAction());
      }
    })
  }

  return (
    <Header className="header flex items-center">
      <div className="text-2xl text-white">EMR</div>
      <div className="ml-auto"></div>
      <div className="text-white">
        {
          user ?
            <Space>
              {
                user.avatar ?
                  <Avatar src={user.avatar} />
                  :
                  <Avatar style={{ backgroundColor: '#1890ff' }}>{user.last_name.charAt(0)}</Avatar>
              }
              <span>{ user.first_name } { user.last_name } ({ ROLES[user.role.id].display })</span>
            </Space>
            :
            "Đang tải..."
        }

        <span className="ml-3">|</span>
      </div>
      <Button type="default" ghost icon={<LogoutOutlined />} className="border-none" onClick={handleLogout}>Đăng xuất</Button>
    </Header>
  )
}

export default CustomHeader;