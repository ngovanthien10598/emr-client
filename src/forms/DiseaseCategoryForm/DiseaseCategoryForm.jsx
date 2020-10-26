import React from 'react';
import { Form, Input } from 'antd';

const DiseaseCategoryForm = props => {
  const { form, onFinish, defaultCategory } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Loại bệnh" name="name" initialValue={defaultCategory?.name}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  )
}

export default DiseaseCategoryForm;