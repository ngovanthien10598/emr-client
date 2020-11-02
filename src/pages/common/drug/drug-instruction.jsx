import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DrugInstructionForm from 'forms/DrugInstructionForm/DrugInstructionForm';
import { getDrugInstructionsAPI, addDrugInstructionAPI, updateDrugInstructionAPI, deleteDrugInstructionAPI } from 'services/admin/drug-instruction.service';
import { formActions } from 'constant/formActions';

const DrugInstructionPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [drugInstructions, setDrugInstructions] = useState([]);
  const [fetchingDrugInstructions, setFetchingDrugInstructions] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [drugInstructionForm] = Form.useForm();

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Hướng dẫn sử dụng',
      key: 'instruction',
      dataIndex: 'instruction'
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

  async function getDrugInstructions() {
    try {
      setFetchingDrugInstructions(true);
      const response = await getDrugInstructionsAPI();
      setDrugInstructions(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingDrugInstructions(false);
    }
  }

  async function handleFormSubmit() {
    try {
      setModalLoading(true);
      const values = await drugInstructionForm.validateFields();
      if (action === formActions.CREATE) {
        await addDrugInstructionAPI(values.instruction);
      }

      if (action === formActions.UPDATE) {
        await updateDrugInstructionAPI(selectedInstruction.id, values.instruction);
      }

      getDrugInstructions();

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setModalLoading(false);
    }
  }

  function handleEditClick(ins) {
    setAction(formActions.UPDATE);
    setSelectedInstruction(ins);
    setModalVisible(true);
  }

  async function handleDelete(unit) {
    try {
      await deleteDrugInstructionAPI(unit.id);
      getDrugInstructions();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    drugInstructionForm.resetFields();
    setSelectedInstruction(null);
  }

  useEffect(() => {
    getDrugInstructions();
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý hướng dẫn sử dụng</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={drugInstructions}
        loading={fetchingDrugInstructions}
        pagination={false} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm hướng dẫn sử dụng' : 'Cập nhật hướng dẫn sử dụng'}
        onCancel={handleCloseModal}
        confirmLoading={modalLoading}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DrugInstructionForm onFinish={handleFormSubmit} form={drugInstructionForm} defaultInstruction={selectedInstruction} />
      </Modal>
    </>
  )
}

export default DrugInstructionPage;