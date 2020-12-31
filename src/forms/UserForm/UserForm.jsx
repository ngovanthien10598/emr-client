import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Spin, Row, Col, DatePicker, Radio } from 'antd';
import { getUserDetailsAPI } from 'services/admin/user.service';
import { ROLES, ROLES_LIST } from 'constant/roles';
import moment from 'moment';
import { requiredRule } from 'constant/formRules';

const UserForm = props => {
  const { form, onFinish, defaultUser } = props;
  const [userDetail, setUserDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  async function getUserDetail(id) {
    try {
      setDetailLoading(true);
      const detailResponse = await getUserDetailsAPI(id);
      const userDetail = detailResponse.data;
      setUserDetail(userDetail);
    } catch (error) {
      console.log(error);
    } finally {
      setDetailLoading(false);
    }
  }

  async function getData() {
    if (defaultUser?.id) {
      await Promise.all([
        getUserDetail(defaultUser.id),
      ]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue({
        email: userDetail.email,
        first_name: userDetail.first_name,
        last_name: userDetail.last_name,
        phone: userDetail.phone,
        DOB: moment(userDetail.DOB),
        gender: userDetail.gender,
        role_id: userDetail.role.id
      });
    }
  }, [userDetail, defaultUser, form]);

  return (
    <Spin spinning={detailLoading}>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}>
        <Form.Item label="Email" name="email" initialValue={userDetail?.email} rules={[
          {
            required: !userDetail || (userDetail && userDetail.role.id != 4),
            message: "Vui lòng điền vào trường này"
          }
        ]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" rules={[
          {
            required: !userDetail?.id,
            message: "Vui lòng điền vào trường này"
          }
        ]}>
          <Input.Password autoComplete="new-password" placeholder={userDetail ? "Nhập mật khẩu mới" : ""} />
        </Form.Item>

        <Row>
          <Col flex={1}>
            <Form.Item label="Họ" name="first_name" rules={[requiredRule()]}>
              <Input />
            </Form.Item>
          </Col>
          <div style={{ width: 20 }}></div>
          <Col flex={1}>
            <Form.Item label="Tên" name="last_name" rules={[requiredRule()]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Điện thoại" name="phone" initialValue={userDetail?.phone} rules={[requiredRule()]}>
          <Input type="tel" />
        </Form.Item>

        <Row>
          <Col>
            <Form.Item label="Ngày sinh" name="DOB" rules={[requiredRule()]}>
              <DatePicker placeholder="Chọn ngày" />
            </Form.Item>
          </Col>
          <div style={{ width: 15 }}></div>
          <Col flex={1}>
            <Form.Item label="Giới tính" name="gender" rules={[requiredRule()]}>
              <Radio.Group>
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
                <Radio value="Khác">Khác</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>


        <Form.Item label="Vai trò" name="role_id" initialValue={userDetail?.role_id} rules={[requiredRule()]}>
          <Select>
            {
              ROLES_LIST.map(role_id => (
                <Select.Option key={role_id} value={role_id}>{ROLES[role_id].display}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default UserForm;