import React from 'react';
import { Form, Input } from 'antd';

const RoomForm = props => {
  const { form, onFinish, defaultRoom } = props;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}>
      <Form.Item label="Số phòng" name="number" initialValue={defaultRoom?.number}>
        <Input type="number" autoFocus />
      </Form.Item>
      <Form.Item label="Tên phòng" name="name" initialValue={defaultRoom?.name}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default RoomForm;