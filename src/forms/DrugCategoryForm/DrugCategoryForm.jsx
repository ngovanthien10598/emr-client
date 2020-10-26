import React from 'react';
import { Form, Input } from 'antd';

const DrugCategoryForm = props => {
  const { form, onFinish, defaultCategory } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Loại thuốc" name="name" initialValue={defaultCategory?.name}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  )
}

export default DrugCategoryForm;