import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ServiceForm from 'forms/ServiceForm/ServiceForm';
import { getServicesAPI, addServiceAPI, updateServiceAPI, deleteServiceAPI } from 'services/admin/medical-service.service';
import { formActions } from 'constant/formActions';
import NumberFormat from 'react-number-format';

const ServicePage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = useState();
  const [fetchingServices, setFetchingServices] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceForm] = Form.useForm();

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Tên dịch vụ',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'price',
      render: (text, record, index) => (<NumberFormat thousandSeparator=" " suffix=" VNĐ" value={text} displayType="text" />)
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

  async function getServices() {
    try {
      setFetchingServices(true);
      const response = await getServicesAPI();
      setServices(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingServices(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await serviceForm.validateFields();
      const data = {
        name: values.name,
        price: values.price,
      }
      if (action === formActions.CREATE) {
        await addServiceAPI(data);
      }

      if (action === formActions.UPDATE) {
        await updateServiceAPI(selectedService.id, data);
      }

      getServices();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(service) {
    setAction(formActions.UPDATE);
    setSelectedService(service);
    setModalVisible(true);
  }

  async function handleDelete(service) {
    try {
      await deleteServiceAPI(service.id);
      getServices();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    serviceForm.resetFields();
    setSelectedService(null);
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý thuốc</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={services}
        loading={fetchingServices} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm thuốc' : 'Cập nhật thuốc'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <ServiceForm onFinish={handleFormSubmit} form={serviceForm} defaultService={selectedService} />
      </Modal>
    </>
  )
}

export default ServicePage;