import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Table, Form, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DrugCategoryForm from 'forms/DrugCategoryForm/DrugCategoryForm';
import { formActions } from 'constant/formActions';
import { connect } from 'react-redux';

// Redux
import { createDrugCategory, fetchDrugCategories, updateDrugCategory, deleteDrugCategory } from 'store/actions/drug-category.action';

const DrugCategoryPage = props => {

  const {
    categories,
    createDrugCategory,
    fetchDrugCategories,
    updateDrugCategory,
    deleteDrugCategory,
    createLoading,
    fetchLoading,
    updateLoading,
    deleteLoading
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState(formActions.CREATE);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drugCategoryForm] = Form.useForm();

  useEffect(() => {
    console.log(deleteLoading);
  }, [deleteLoading]);

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
            onConfirm={async () => await handleDelete(record)} title="Bạn có chắc muốn xóa không?"
            okButtonProps={{loading: deleteLoading}}
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

  async function handleFormSubmit() {
    try {
      const values = await drugCategoryForm.validateFields();
      const name = values.name;
      const index = name.indexOf(". ");
      let cut = name.substr(index > -1 ? index + 2 : 0);
      const indexOfNhom = cut.indexOf("Nhóm");
      if (indexOfNhom === -1) {
        cut = "Nhóm " + cut;
      }
      const convertedStr = cut.charAt(0).toUpperCase() + cut.substr(1).toLowerCase();
      if (action === formActions.CREATE) {
        // await addDrugCategoryAPI(convertedStr);
        await createDrugCategory({ name: convertedStr });
      }

      if (action === formActions.UPDATE) {
        // await updateDrugCategoryAPI(selectedCategory.id, convertedStr);
        await updateDrugCategory(selectedCategory.id, { name: convertedStr });
      }

      // getDrugCategories();
      

      setModalVisible(false);
      await fetchDrugCategories("admin");
      
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  }

  function handleEditClick(category) {
    setAction(formActions.UPDATE);
    setSelectedCategory(category);
    setModalVisible(true);
  }

  async function handleDelete(cat) {
    try {
      // await deleteDrugCategoryAPI(unit.id);
      await deleteDrugCategory(cat.id)
      await fetchDrugCategories("admin");
      // getDrugCategories();
    } catch (error) {
      console.log(error);
    }
  }

  function afterClose() {
    drugCategoryForm.resetFields();
    setSelectedCategory(null);
  }

  useEffect(() => {
    fetchDrugCategories("admin");
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Col><h1 className="text-xl">Quản lý nhóm thuốc</h1></Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>Tạo mới</Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={categories}
        pagination={false}
        loading={fetchLoading} />
      <Modal
        visible={modalVisible}
        title={action === formActions.CREATE ? 'Thêm nhóm thuốc' : 'Cập nhật nhóm thuốc'}
        onCancel={handleCloseModal}
        confirmLoading={(action === formActions.UPDATE && updateLoading) || (action === formActions.CREATE && createLoading)}
        destroyOnClose={true}
        afterClose={afterClose}
        onOk={handleFormSubmit}>
        <DrugCategoryForm onFinish={handleFormSubmit} form={drugCategoryForm} defaultCategory={selectedCategory} />
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  categories: state.drugCategoryState.drugCategories,
  createLoading: state.drugCategoryState.createLoading,
  fetchLoading: state.drugCategoryState.fetchLoading,
  updateLoading: state.drugCategoryState.updateLoading,
  deleteLoading: state.drugCategoryState.deleteLoading
})

const mapDispatchToProps = dispatch => ({
  createDrugCategory: (body) => dispatch(createDrugCategory(body)),
  fetchDrugCategories: (role, query) => dispatch(fetchDrugCategories(role, query)),
  updateDrugCategory: (id, body) => dispatch(updateDrugCategory(id, body)),
  deleteDrugCategory: (id) => dispatch(deleteDrugCategory(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrugCategoryPage);