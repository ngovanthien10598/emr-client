import React from 'react';
import { Form, Input } from 'antd';

const DrugDosageFormForm = props => {
  const { form, onFinish, defaultDosageForm } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Dạng bào chế" name="name" initialValue={defaultDosageForm?.name}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  )
}

export default DrugDosageFormForm;