import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DrugUnitForm from 'forms/DrugUnitForm/DrugUnitForm';
import { getDrugUnitsAPI, addDrugUnitAPI, updateDrugUnitAPI, deleteDrugUnitAPI } from 'services/admin/drug-unit.service';
import { formActions } from 'constant/formActions';

const DrugUnitPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [drugUnits, setDrugUnits] = useState([]);
  const [fetchingDrugUnits, setFetchingDrugUnits] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [drugUnitForm] = Form.useForm();

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Đơn vị tính',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Hành động',
      key: 'action',
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

  async function getDrugUnits() {
    try {
      setFetchingDrugUnits(true);
      const response = await getDrugUnitsAPI();
      setDrugUnits(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingDrugUnits(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await drugUnitForm.validateFields();
      if (action === formActions.CREATE) {
        await addDrugUnitAPI(values.name);
      }

      if (action === formActions.UPDATE) {
        await updateDrugUnitAPI(selectedUnit.id, values.name);
      }

      getDrugUnits();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
      drugUnitForm.resetFields();
    }
  }

  function handleEditClick(unit) {
    setAction(formActions.UPDATE);
    setSelectedUnit(unit);
    setModalVisible(true);
  }

  async function handleDelete(unit) {
    try {
      await deleteDrugUnitAPI(unit.id);
      getDrugUnits();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    drugUnitForm.resetFields();
    setSelectedUnit(null);
  }

  useEffect(() => {
    getDrugUnits();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý đơn vị tính</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={drugUnits}
        loading={fetchingDrugUnits} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm đơn vị tính' : 'Cập nhật đơn vị tính'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DrugUnitForm onFinish={handleFormSubmit} form={drugUnitForm} defaultUnit={selectedUnit} />
      </Modal>
    </>
  )
}

export default DrugUnitPage;