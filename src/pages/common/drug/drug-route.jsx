import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DrugRouteForm from 'forms/DrugRouteForm/DrugRouteForm';
import { addDrugRouteAPI, deleteDrugRouteAPI, getDrugRouteAPI, updateDrugRouteAPI } from 'services/admin/drug-route.service';
import { formActions } from 'constant/formActions';

const DrugRoutePage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [fetchingRoutes, setFetchingRoutes] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [drugRouteForm] = Form.useForm();

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Tên',
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

  async function getDrugRoutes() {
    try {
      setFetchingRoutes(true);
      const response = await getDrugRouteAPI();
      setRoutes(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingRoutes(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await drugRouteForm.validateFields();
      if (action === formActions.CREATE) {
        await addDrugRouteAPI(values.name);
      }

      if (action === formActions.UPDATE) {
        await updateDrugRouteAPI(selectedRoute.id, values.name);
      }

      getDrugRoutes();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(route) {
    setAction(formActions.UPDATE);
    setSelectedRoute(route);
    setModalVisible(true);
  }

  async function handleDelete(unit) {
    try {
      await deleteDrugRouteAPI(unit.id);
      getDrugRoutes();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    drugRouteForm.resetFields();
    setSelectedRoute(null);
  }

  useEffect(() => {
    getDrugRoutes();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý đường dùng thuốc</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={routes}
        pagination={false}
        loading={fetchingRoutes} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm đường dùng thuốc' : 'Cập nhật đường dùng thuốc'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DrugRouteForm onFinish={handleFormSubmit} form={drugRouteForm} defaultRoute={selectedRoute} />
      </Modal>
    </>
  )
}

export default DrugRoutePage;