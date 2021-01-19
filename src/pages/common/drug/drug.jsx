import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DrugForm from 'forms/DrugForm/DrugForm';
import { getDrugsAPI, addDrugAPI, updateDrugAPI, deleteDrugAPI } from 'services/admin/drug.service';
import { formActions } from 'constant/formActions';

const DrugPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [drugs, setDrugs] = useState();
  const [fetchingDrugs, setFetchingDrugs] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [drugForm] = Form.useForm();

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Mã thuốc',
      key: 'code',
      dataIndex: 'code'
    },
    {
      title: 'Tên thuốc',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Hàm lượng/nồng độ',
      key: 'strength',
      dataIndex: 'strength'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
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

  async function getDrugs() {
    try {
      setFetchingDrugs(true);
      const response = await getDrugsAPI();
      setDrugs(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingDrugs(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await drugForm.validateFields();
      console.log(values);
      if (action === formActions.CREATE) {
        await addDrugAPI(values);
      }

      if (action === formActions.UPDATE) {
        await updateDrugAPI(selectedDrug.id, values);
      }

      getDrugs();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(drug) {
    setAction(formActions.UPDATE);
    setSelectedDrug(drug);
    setModalVisible(true);
  }

  async function handleDelete(drug) {
    try {
      await deleteDrugAPI(drug.id);
      getDrugs();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    drugForm.resetFields();
    setSelectedDrug(null);
  }

  useEffect(() => {
    getDrugs();
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
        dataSource={drugs}
        loading={fetchingDrugs}
        pagination={false} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm thuốc' : 'Cập nhật thuốc'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DrugForm onFinish={handleFormSubmit} form={drugForm} defaultDrug={selectedDrug} />
      </Modal>
    </>
  )
}

export default DrugPage;