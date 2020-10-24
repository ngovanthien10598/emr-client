import React, { useState } from 'react';
import { Row, Col, Button, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DrugUnitForm from 'forms/DrugUnitForm/DrugUnitForm';

const DrugUnitPage = () => {

  const [modalVisible, setModalVisible] = useState(false);

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Đơn vị tính</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Modal
        visible={modalVisible}
        title="Thêm đơn vị tính"
        onCancel={handleCloseModal}>
        <DrugUnitForm />
      </Modal>
    </>
  )
}

export default DrugUnitPage;