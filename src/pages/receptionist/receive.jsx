import React, { useState, useEffect } from 'react';
import { Input, Table, Form, PageHeader, Button, Modal, Menu, Dropdown } from 'antd';
import { listAllPatientsAPI } from 'services/user/patient.service';
import { PlusOutlined } from '@ant-design/icons';
import PatientForm from 'forms/PatientForm/PatientForm';
import { getRoomAPI } from 'services/user/room.service';
import { createVisitAPI } from 'services/user/visit.service';

const ReceivePage = props => {

  const [patientData, setPatientData] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCreatingVisit, setCreatingVisit] = useState(false);
  const [patientForm] = Form.useForm();

  function renderMenu(patientId) {
    return (
      <Menu>
        {
          rooms.map(room => (
            <Menu.Item key={room.id} onClick={() => handleCreateVisit(patientId, room.id)}>{room.name}</Menu.Item>
          ))
        }
      </Menu>
    )
  }

  const tableColumns = [
    {
      title: '#',
      key: 'index',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Họ và tên',
      key: 'fullname',
      render: (text, { first_name, last_name }) => first_name + ' ' + last_name
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
      title: 'Điện thoại',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={renderMenu(record.id)} overlayStyle={{ minWidth: 200 }} trigger="click">
          <Button>Tiếp nhận</Button>
        </Dropdown>
      )
    }
  ]


  //
  // Load initial data
  //
  async function listAllPatients(search) {
    try {
      setPatientLoading(true);
      const patientResponse = await listAllPatientsAPI(search);
      setPatientData(patientResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPatientLoading(false);
    }
  }

  async function getRooms() {
    try {
      setRoomLoading(true);
      const roomResponse = await getRoomAPI();
      setRooms(roomResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRoomLoading(false);
    }
  }

  async function getInitialData() {
    await Promise.all([
      listAllPatients(),
      getRooms()
    ])
  }

  useEffect(() => {
    getInitialData();
  }, []);

  //
  // Component functions
  //
  function handleAddClick() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleSearch(values) {
    listAllPatients(values.search);
  }

  function handleSubmit() {

  }

  function handleReceiveClick(patientId) {
    setRoomModalVisible(true);
  }

  async function handleCreateVisit(patientId, roomId) {
    try {
      setCreatingVisit(true);
      const createVisitResponse = await createVisitAPI({ patientId, roomId });
      console.log(createVisitResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setCreatingVisit(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Tiếp nhận bệnh nhân"
        className="pl-0"
        extra={<Button type="primary" onClick={handleAddClick} icon={<PlusOutlined />}>Bệnh nhân mới</Button>} />

      <Form onFinish={handleSearch}>
        <Form.Item name="search">
          <Input.Search size="large" placeholder="Tìm kiếm bệnh nhân theo tên/SĐT" />
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        dataSource={patientData?.results}
        loading={patientLoading || isCreatingVisit}
        columns={tableColumns} />
      <Modal
        visible={modalVisible}
        onCancel={handleCloseModal}
        destroyOnClose={true}
        title="Bệnh nhân mới">
        <PatientForm form={patientForm} onFinish={handleSubmit} />
      </Modal>
    </>
  )
}

export default ReceivePage;