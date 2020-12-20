import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DrugDosageFormForm from 'forms/DrugDosageFormForm/DrugDosageFormForm';
import { addDrugDosageFormAPI, deleteDrugDosageFormAPI, getDrugDosageFormAPI, updateDrugDosageFormAPI } from 'services/admin/drug-dosage-form.service';
import { formActions } from 'constant/formActions';

const DrugDosageFormPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [dosageForms, setDosageForms] = useState([]);
  const [fetchingDosageForms, setFetchingDosageForms] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedDosageForm, setSelectedDosageForm] = useState(null);
  const [drugDosageFormForm] = Form.useForm();

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

  async function getDrugDosageForms() {
    try {
      setFetchingDosageForms(true);
      const response = await getDrugDosageFormAPI();
      setDosageForms(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingDosageForms(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await drugDosageFormForm.validateFields();
      if (action === formActions.CREATE) {
        await addDrugDosageFormAPI(values.name);
      }

      if (action === formActions.UPDATE) {
        await updateDrugDosageFormAPI(selectedDosageForm.id, values.name);
      }

      getDrugDosageForms();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(dosageForm) {
    setAction(formActions.UPDATE);
    setSelectedDosageForm(dosageForm);
    setModalVisible(true);
  }

  async function handleDelete(unit) {
    try {
      await deleteDrugDosageFormAPI(unit.id);
      getDrugDosageForms();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    drugDosageFormForm.resetFields();
    setSelectedDosageForm(null);
  }

  useEffect(() => {
    getDrugDosageForms();
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
        dataSource={dosageForms}
        pagination={false}
        loading={fetchingDosageForms} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm đường dùng thuốc' : 'Cập nhật đường dùng thuốc'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DrugDosageFormForm onFinish={handleFormSubmit} form={drugDosageFormForm} defaultDosageForm={selectedDosageForm} />
      </Modal>
    </>
  )
}

export default DrugDosageFormPage;