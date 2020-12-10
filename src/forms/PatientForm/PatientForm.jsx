import React from 'react';
import { Form, Input, Row, Col, DatePicker, Radio } from 'antd';
import { requiredRule } from 'constant/formRules';

const PatientForm = props => {
  const { form, onFinish } = props;

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}>
      <Row>
        <Col flex={1}>
          <Form.Item label="Họ và tên lót" name="first_name" rules={[requiredRule()]}>
            <Input autoFocus />
          </Form.Item>
        </Col>
        <Col flex="0 0 15px"></Col>
        <Col flex={1}>
          <Form.Item label="Tên" name="last_name" rules={[requiredRule()]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="phone" label="Số điện thoại" rules={[requiredRule()]}>
        <Input />
      </Form.Item>
      <Row>
        <Col>
          <Form.Item name="DOB" label="Ngày sinh" rules={[requiredRule()]}>
            <DatePicker placeholder="Chọn ngày" />
          </Form.Item>

        </Col>
        <Col flex="0 0 15px"></Col>
        <Col flex={1}>
          <Form.Item name="gender" label="Giới tính" rules={[requiredRule()]}>
            <Radio.Group>
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
              <Radio value="Khác">Khác</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  )
}

export default PatientForm;