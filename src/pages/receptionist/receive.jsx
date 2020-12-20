import React, { useState, useEffect } from 'react';
import { Input, Table, Form, PageHeader, Button, Modal, Menu, Dropdown, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PatientForm from 'forms/PatientForm/PatientForm';

// APIs
import { getRoomAPI } from 'services/user/room.service';
import { createVisitAPI } from 'services/user/visit.service';
import { listAllPatientsAPI, createPatientAPI } from 'services/user/patient.service';
import { addBlockChainUserAPI } from 'services/user/user.service';

const ReceivePage = props => {

  const [patientData, setPatientData] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [isCreatingPatient, setCreatingPatient] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCreatingVisit, setCreatingVisit] = useState(false);
  const [patientForm] = Form.useForm();

  function renderMenu(patient) {
    return (
      <Menu>
        {
          rooms?.map(room => (
            <Menu.Item key={room.id} onClick={() => handleCreateVisit(patient, room)}>Khoa {room.name}</Menu.Item>
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
        <Dropdown overlay={renderMenu(record)} overlayStyle={{ minWidth: 200 }} trigger="click">
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

  async function handleSubmit() {
    try {
      setCreatingPatient(true);
      const values = await patientForm.validateFields();
      values.DOB = values.DOB.format('YYYY-MM-DD');
      const createResponse = await createPatientAPI(values);
      const userId = createResponse.data.id;
      await addBlockChainUserAPI(userId, "patient");
      // await addBlockChainUserAPI("4f31587e-40cc-43a9-a3bf-a7e5fa731955", "patient");
    } catch (error) {
      console.log(error);
    } finally {
      setCreatingPatient(false);
    }
  }

  async function handleCreateVisit(patient, room) {
    try {
      setCreatingVisit(true);
      await createVisitAPI({ patientId: patient.id, roomId: room.id });
      message.success(`Đã tiếp nhận bệnh nhân ${patient.first_name} ${patient.last_name} vào ${room.name}`);
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
        confirmLoading={isCreatingPatient}
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        destroyOnClose={true}
        title="Bệnh nhân mới">
        <PatientForm form={patientForm} onFinish={handleSubmit} />
      </Modal>
    </>
  )
}

export default ReceivePage;