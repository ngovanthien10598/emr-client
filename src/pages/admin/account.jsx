import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import UserForm from 'forms/UserForm/UserForm';
import { getUsersAPI, addUserAPI, updateUserAPI, deleteUserAPI } from 'services/admin/user.service';
import { formActions } from 'constant/formActions';
import NumberFormat from 'react-number-format';

const AdminAccountPage = () => {

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
      title: 'Họ',
      key: 'first_name',
      dataIndex: 'first_name'
    },
    {
      title: 'Tên',
      key: 'last_name',
      dataIndex: 'last_name'
    },
    {
      title: 'Giới tính',
      key: 'gender',
      dataIndex: 'gender'
    },
    {
      title: 'Ngày sinh',
      key: 'DOB',
      dataIndex: 'DOB'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Điện thoại',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (text, record) => <span>{record.role.name}</span>
    },
    {
      title: 'Hành động', key: 'action', render: (text, { id, is_active }) => {
        return is_active ?
          <Button danger type="link" icon={<LockOutlined />}>Khóa</Button>
          :
          <Button type="link" icon={<UnlockOutlined />}>Mở khóa</Button>
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

  async function getUsers() {
    try {
      setFetchingUsers(true);
      const response = await getUsersAPI();
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
      const data = {
        code: values.code,
        name: values.name,
        price: values.price,
        user_category: values.user_category,
        user_unit: values.user_unit
      }
      if (action === formActions.CREATE) {
        await addUserAPI(data);
      }

      if (action === formActions.UPDATE) {
        await updateUserAPI(selectedUser.id, data);
      }

      getUsers();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(user) {
    setAction(formActions.UPDATE);
    setSelectedUser(user);
    setModalVisible(true);
  }

  async function handleDelete(user) {
    try {
      await deleteUserAPI(user.id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    userForm.resetFields();
    setSelectedUser(null);
  }

  useEffect(() => {
    getUsers();
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
        loading={fetchingUsers} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm thuốc' : 'Cập nhật thuốc'}
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