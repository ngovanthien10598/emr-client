import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DrugCategoryForm from 'forms/DrugCategoryForm/DrugCategoryForm';
import { addDrugCategoryAPI, deleteDrugCategoryAPI, getDrugCategoryAPI, updateDrugCategoryAPI } from 'services/admin/drug-category.service';
import { formActions } from 'constant/formActions';

const DrugCategoryPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drugCategoryForm] = Form.useForm();

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

  async function getDrugCategories() {
    try {
      setFetchingCategories(true);
      const response = await getDrugCategoryAPI();
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
      const values = await drugCategoryForm.validateFields();
      if (action === formActions.CREATE) {
        await addDrugCategoryAPI(values.name);
      }

      if (action === formActions.UPDATE) {
        await updateDrugCategoryAPI(selectedCategory.id, values.name);
      }

      getDrugCategories();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(category) {
    setAction(formActions.UPDATE);
    setSelectedCategory(category);
    setModalVisible(true);
  }

  async function handleDelete(unit) {
    try {
      await deleteDrugCategoryAPI(unit.id);
      getDrugCategories();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    drugCategoryForm.resetFields();
    setSelectedCategory(null);
  }

  useEffect(() => {
    getDrugCategories();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý loại thuốc</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={categories}
        pagination={false}
        loading={fetchingCategories} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm loại thuốc' : 'Cập nhật loại thuốc'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DrugCategoryForm onFinish={handleFormSubmit} form={drugCategoryForm} defaultCategory={selectedCategory} />
      </Modal>
    </>
  )
}

export default DrugCategoryPage;