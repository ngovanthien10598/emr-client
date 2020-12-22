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

      <Row gutter={15}>
        <Col flex="0 0 50%">
          <Form.Item name="job" label="Nghề nghiệp">
            <Input />
          </Form.Item>
        </Col>
        <Col flex="0 0 50%">
          <Form.Item name="workplace" label="Nơi làm việc">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={15}>
        <Col flex="0 0 50%">
          <Form.Item name="ethnicity" label="Dân tộc">
            <Input />
          </Form.Item>
        </Col>
        <Col flex="0 0 50%">
          <Form.Item name="expatriate" label="Ngoại kiều">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Họ và tên người nhà" name="family_member_name">
        <Input />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="address">
        <Input.TextArea autoSize={{ minRows: 2 }} />
      </Form.Item>

      <Form.Item label="Địa chỉ người nhà" name="family_member_address">
        <Input.TextArea autoSize={{ minRows: 2 }} />
      </Form.Item>

    </Form>
  )
}

export default PatientForm;