import React from 'react';
import { Form, Input } from 'antd';

const DrugRouteForm = props => {
  const { form, onFinish, defaultRoute } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Đường dùng thuốc" name="name" initialValue={defaultRoute?.name}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  )
}

export default DrugRouteForm;