import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, LockOutlined, UnlockOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import UserForm from 'forms/UserForm/UserForm';
import { getUsersAPI, addUserAPI, updateUserAPI, deleteUserAPI, blockUserAPI, unblockUserAPI } from 'services/admin/user.service';
import { formActions } from 'constant/formActions';
import NumberFormat from 'react-number-format';
import { ROLES } from 'constant/roles';
import { useHistory, useLocation } from 'react-router-dom';
import Circle from 'components/Circle/Circle';

const AdminAccountPage = () => {

  const history = useHistory();
  const { pathname, search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const currentPageOnURL = Number(urlSearchParams.get('page'));
  const [page, setPage] = useState(currentPageOnURL || 1);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState();
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm] = Form.useForm();

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Họ và tên',
      key: 'fullname',
      render: (text, record) => record.first_name + " " + record.last_name
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text, record) => (
        <Space>
          <Circle color={record.is_verified_email ? 'success' : ''} />
          <span>{record.email}</span>
        </Space>
      )
    },
    {
      title: 'Điện thoại',
      key: 'phone',
      dataIndex: 'phone',
      render: (text, record) => (
        <Space>
          <Circle color={record.is_verified_phone ? 'success' : ''} />
          <span>{record.phone}</span>
        </Space>
      )
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (text, record) => <span>{ROLES[record.role.id].display}</span>
    },
    {
      title: 'Hành động', key: 'action', render: (text, record) => {
        return (
          <Space size={10}>
            <Button icon={<EyeOutlined />} onClick={() => handleViewClick(record)}></Button>
            <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)}></Button>
            <Popconfirm
              onConfirm={() => handleDelete(record)}
              title="Bạn có chắc muốn xóa không?"
              okText="Xóa"
              okType="danger"
              cancelText="Hủy bỏ">
              <Button icon={<DeleteOutlined />}></Button>
            </Popconfirm>
            {
              <Popconfirm
                onConfirm={() => handleBlockUnblock(record)}
                title={`Bạn có chắc muốn ${record.is_active ? 'khóa' : 'mở khóa'} tài khoản này không?`}
                okText={record.is_active ? "Khóa" : "Mở khóa"}
                okType={record.is_active ? "danger" : "primary"}
                cancelText="Hủy bỏ">
                {
                  record.is_active ?
                    <Button danger type="link" icon={<LockOutlined />}>Khóa</Button>
                    :
                    <Button type="link" icon={<UnlockOutlined />}>Mở khóa</Button>
                }
              </Popconfirm>
            }
          </Space>
        )
      }
    }
  ]

  function handleOpenModal() {
    setAction(formActions.CREATE);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function getUsers(page) {
    try {
      setFetchingUsers(true);
      const response = await getUsersAPI({ page: page });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingUsers(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await userForm.validateFields();
      if (action === formActions.CREATE) {
        await addUserAPI(values);
      }

      if (action === formActions.UPDATE) {
        if (values.password.length === 0) {
          delete values.password;
        }
        await updateUserAPI(selectedUser.id, values);
      }

      getUsers(page);

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  async function handleBlockUnblock(user) {
    try {
      setFetchingUsers(true);
      if (user.is_active) {
        await blockUserAPI(user.id);
      } else {
        await unblockUserAPI(user.id);
      }
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  function handleViewClick(user) {

  }

  function handleEditClick(user) {
    setAction(formActions.UPDATE);
    setSelectedUser(user);
    setModalVisible(true);
  }

  async function handleDelete(user) {
    try {
      await deleteUserAPI(user.id);
      getUsers(page);
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    userForm.resetFields();
    setSelectedUser(null);
  }

  function handlePaginationChange(page) {
    getUsers(page);
    setPage(page);
    history.push({
      pathname: pathname,
      search: `page=${page}`
    })
  }

  useEffect(() => {
    getUsers(page);
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý tài khoản</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={users?.results}
        pagination={{
          defaultCurrent: page,
          current: page,
          pageSize: 10,
          total: users?.count,
          onChange: handlePaginationChange
        }}
        loading={fetchingUsers} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm tài khoản' : 'Cập nhật tài khoản'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <UserForm onFinish={handleFormSubmit} form={userForm} defaultUser={selectedUser} />
      </Modal>
    </>
  )
}

export default AdminAccountPage;