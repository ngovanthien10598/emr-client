import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DiseaseCategoryForm from 'forms/DiseaseCategoryForm/DiseaseCategoryForm';
import { addDiseaseCategoryAPI, deleteDiseaseCategoryAPI, getDiseaseCategoryAPI, updateDiseaseCategoryAPI } from 'services/admin/disease-category.service';
import { formActions } from 'constant/formActions';

const DiseaseCategoryPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [diseaseCategoryForm] = Form.useForm();

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

  async function getDiseaseCategories() {
    try {
      setFetchingCategories(true);
      const response = await getDiseaseCategoryAPI();
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
      const values = await diseaseCategoryForm.validateFields();
      if (action === formActions.CREATE) {
        await addDiseaseCategoryAPI(values.name);
      }

      if (action === formActions.UPDATE) {
        await updateDiseaseCategoryAPI(selectedCategory.id, values.name);
      }

      getDiseaseCategories();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
      diseaseCategoryForm.resetFields();
    }
  }

  function handleEditClick(category) {
    setAction(formActions.UPDATE);
    setSelectedCategory(category);
    setModalVisible(true);
  }

  async function handleDelete(unit) {
    try {
      await deleteDiseaseCategoryAPI(unit.id);
      getDiseaseCategories();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    diseaseCategoryForm.resetFields();
    setSelectedCategory(null);
  }

  useEffect(() => {
    getDiseaseCategories();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý loại bệnh</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={categories}
        
        loading={fetchingCategories} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm loại bệnh' : 'Cập nhật loại bệnh'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DiseaseCategoryForm onFinish={handleFormSubmit} form={diseaseCategoryForm} defaultCategory={selectedCategory} />
      </Modal>
    </>
  )
}

export default DiseaseCategoryPage;