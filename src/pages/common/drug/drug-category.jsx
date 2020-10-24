import React, { useState } from 'react';
import { Row, Col, Button, Modal, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DrugCategoryForm from 'forms/DrugCategoryForm/DrugCategoryForm';

const DrugCategoryPage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name'
    }
  ]

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Loại thuốc</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table columns={tableColumns} dataSource={categories} />
      <Modal
        visible={modalVisible}
        title="Thêm loại thuốc"
        onCancel={handleCloseModal}>
        <DrugCategoryForm />
      </Modal>
    </>
  )
}

export default DrugCategoryPage;