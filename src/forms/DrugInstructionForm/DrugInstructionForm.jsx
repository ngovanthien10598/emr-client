import React from 'react';
import { Form, Input } from 'antd';

const DrugInstructionForm = props => {
  const { form, onFinish, defaultInstruction } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Hướng dẫn sử dụng" name="instruction" initialValue={defaultInstruction?.instruction}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  )
}

export default DrugInstructionForm;