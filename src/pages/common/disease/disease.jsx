import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DiseaseForm from 'forms/DiseaseForm/DiseaseForm';
import { getDiseasesAPI, addDiseaseAPI, updateDiseaseAPI, deleteDiseaseAPI } from 'services/admin/disease.service';
import { formActions } from 'constant/formActions';

const DiseasePage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [diseases, setDiseases] = useState();
  const [fetchingDiseases, setFetchingDiseases] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [diseaseForm] = Form.useForm();

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Mã bệnh',
      key: 'code',
      dataIndex: 'code'
    },
    {
      title: 'Tên bệnh',
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

  async function getDiseases() {
    try {
      setFetchingDiseases(true);
      const response = await getDiseasesAPI();
      setDiseases(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingDiseases(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await diseaseForm.validateFields();
      const data = {
        code: values.code,
        name: values.name,
        disease_category: values.disease_category,
      }
      if (action === formActions.CREATE) {
        await addDiseaseAPI(data);
      }

      if (action === formActions.UPDATE) {
        await updateDiseaseAPI(selectedDisease.id, data);
      }

      getDiseases();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(disease) {
    setAction(formActions.UPDATE);
    setSelectedDisease(disease);
    setModalVisible(true);
  }

  async function handleDelete(disease) {
    try {
      await deleteDiseaseAPI(disease.id);
      getDiseases();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    diseaseForm.resetFields();
    setSelectedDisease(null);
  }

  useEffect(() => {
    getDiseases();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý bệnh</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={diseases}
        loading={fetchingDiseases} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm bệnh' : 'Cập nhật bệnh'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DiseaseForm onFinish={handleFormSubmit} form={diseaseForm} defaultDisease={selectedDisease} />
      </Modal>
    </>
  )
}

export default DiseasePage;