import React from 'react';
import { Form, Input } from 'antd';

const PatientForm = props => {
  const { form, onFinish } = props;

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}>
      <Form.Item label="Tên bệnh nhân">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PatientForm;