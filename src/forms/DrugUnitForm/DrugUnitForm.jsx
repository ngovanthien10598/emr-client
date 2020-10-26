import React from 'react';
import { Form, Input } from 'antd';

const DrugUnitForm = props => {
  const { form, onFinish, defaultUnit } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Đơn vị tính" name="name" initialValue={defaultUnit?.name}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  )
}

export default DrugUnitForm;