import React from 'react';
import { Form, Input } from 'antd';
import { requiredRule } from 'constant/formRules';

const DrugCategoryForm = props => {
  const { form, onFinish, defaultCategory } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Nhóm thuốc" name="name" initialValue={defaultCategory?.name} rules={[requiredRule("Trường này là bắt buộc")]}>
        <Input autoFocus />
      </Form.Item>
    </Form>
  )
}

export default DrugCategoryForm;