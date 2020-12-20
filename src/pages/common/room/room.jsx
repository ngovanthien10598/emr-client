import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import RoomForm from 'forms/RoomForm/RoomForm';
import { addRoomAPI, deleteRoomAPI, getRoomAPI, updateRoomAPI } from 'services/admin/room.service';
import { formActions } from 'constant/formActions';

const RoomPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [rooms, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomForm] = Form.useForm();

  const tableColumns = [
    {
      title: 'Mã khoa',
      key: 'number',
      dataIndex: 'number',
      width: '150px'
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '150px',
      render: (text, record, index) => (
        <Space size={10}>
          <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)}></Button>
          <Popconfirm
            onConfirm={() => handleDelete(record)} title="Bạn có chắc muốn xóa không?"
            okText="Xóa"
            okType="danger"
            cancelText="Hủy bỏ">
            <Button icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  function handleOpenModal() {
    setAction(formActions.CREATE);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function getRooms() {
    try {
      setFetchingCategories(true);
      const response = await getRoomAPI();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingCategories(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await roomForm.validateFields();
      if (action === formActions.CREATE) {
        await addRoomAPI(values);
      }

      if (action === formActions.UPDATE) {
        await updateRoomAPI(selectedRoom.id, values);
      }

      getRooms();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(room) {
    setAction(formActions.UPDATE);
    setSelectedRoom(room);
    setModalVisible(true);
  }

  async function handleDelete(unit) {
    try {
      await deleteRoomAPI(unit.id);
      getRooms();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    roomForm.resetFields();
    setSelectedRoom(null);
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý khoa</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={rooms}
        
        loading={fetchingCategories} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm khoa' : 'Cập nhật khoa'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <RoomForm onFinish={handleFormSubmit} form={roomForm} defaultRoom={selectedRoom} />
      </Modal>
    </>
  )
}

export default RoomPage;