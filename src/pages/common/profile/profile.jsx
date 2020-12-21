import { Avatar, Row, Col, Spin, Upload, Form, Input, Select, DatePicker, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64 } from 'utils/image';
import { API_URL } from 'constant/apiUrl';
import Cookie from 'js-cookie';
import moment from 'moment';


// APIs
import { updateProfile } from 'services/user/user.service';
import { changePasswordAPI } from 'services/auth/auth.service';

const { Item, useForm } = Form;

const ProfilePage = props => {
  const { user } = props;
  const token = Cookie.get('EMR_token');

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.avatar);

  const [changePasswordForm] = useForm();

  useEffect(() => {
    if (user && user.avatar) {
      setImageUrl(user.avatar);
    }
  }, [user]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.avatar);
      setLoading(false);
    }
  };

  async function handleSaveProfile(values) {
    if (moment.isMoment(values.DOB)) {
      values.DOB = values.DOB.format('YYYY-MM-DD');
    }

    try {
      setUpdateLoading(true);
      await updateProfile(values);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateLoading(false);
    }
  }

  async function handleChangePassword(values) {
    try {
      setChangePasswordLoading(true);
      await changePasswordAPI(values);
      message.success("Đổi mật khẩu thành công");
      changePasswordForm.resetFields();
    } catch (error) {
      console.log(error);
    } finally {
      setChangePasswordLoading(false);
    }
  }

  return !user ? <Spin spinning={true} /> : (
    <>
      <Row gutter={60}>
        <Col flex="0 0 50%">
          <h3 className="text-xl mb-3">Hồ sơ cá nhân</h3>
          <Upload
            name="image"
            action={`${API_URL}/user/profile/avatar/`}
            headers={{ Authorization: `Bearer ${token}` }}
            method="PATCH"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}

            onChange={handleChange} >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>

          <Spin spinning={updateLoading}>
            <Form layout="vertical" onFinish={handleSaveProfile}>
              <Row gutter={15}>
                <Col flex="0 0 50%">
                  <Item label="Họ" name="first_name" initialValue={user.first_name}>
                    <Input />
                  </Item>
                </Col>
                <Col flex="0 0 50%">
                  <Item label="Tên" name="last_name" initialValue={user.last_name}>
                    <Input />
                  </Item>
                </Col>
              </Row>
              <Row gutter={15}>
                <Col flex="0 0 50%">
                  <Item label="Giới tính" name="gender" initialValue={user.gender}>
                    <Select>
                      <Select.Option value="Nam">Nam</Select.Option>
                      <Select.Option value="Nữ">Nữ</Select.Option>
                      <Select.Option value="Khác">Khác</Select.Option>
                    </Select>
                  </Item>
                </Col>
                <Col flex="0 0 50%">
                  <Item label="Ngày sinh" name="DOB" initialValue={moment(user.DOB)}>
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                  </Item>
                </Col>
              </Row>
              <Row gutter={15}>
                <Col flex="0 0 50%">
                  <Item label="Địa chỉ email">
                    <Input value={user.email} readOnly />
                  </Item>
                </Col>
                <Col flex="0 0 50%">
                  <Item label="Điện thoại" name="phone" initialValue={user.phone}>
                    <Input />
                  </Item>
                </Col>
              </Row>
              <Row gutter={15}>
                <Col flex="0 0 50%">
                  <Item label="Nghề nghiệp" name="job" initialValue={user.job}>
                    <Input />
                  </Item>
                </Col>
                <Col flex="0 0 50%">
                  <Item label="Nơi làm việc" name="workplace" initialValue={user.workplace}>
                    <Input />
                  </Item>
                </Col>
              </Row>
              <Row gutter={15}>
                <Col flex="0 0 50%">
                  <Item label="Dân tộc" name="ethnicity" initialValue={user.ethnicity}>
                    <Input />
                  </Item>
                </Col>
                <Col flex="0 0 50%">
                  <Item label="Ngoại kiều" name="expatriate" initialValue={user.expatriate}>
                    <Input />
                  </Item>
                </Col>
              </Row>

              <Form.Item label="Họ và tên người nhà" name="family_member_name" initialValue={user.family_member_name}>
                <Input />
              </Form.Item>

              <Form.Item label="Địa chỉ" name="address" initialValue={user.address}>
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
              </Form.Item>

              <Form.Item label="Địa chỉ người nhà" name="family_member_address" initialValue={user.family_member_address}>
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
              </Form.Item>

              <Button type="primary" htmlType="submit">Cập nhật</Button>
            </Form>
          </Spin>

        </Col>
        <Col flex="0 0 50%">
          <h3 className="text-xl mb-3">Đổi mật khẩu</h3>

          <Spin spinning={changePasswordLoading}>
            <Form layout="vertical" onFinish={handleChangePassword} autoComplete="new-password" form={changePasswordForm}>
              <Item label="Mật khẩu cũ" name="old_password">
                <Input.Password />
              </Item>

              <Item label="Mật khẩu mới" name="new_password">
                <Input.Password />
              </Item>

              <Item label="Nhập lại mật khẩu mới" name="confirm_password">
                <Input.Password />
              </Item>

              <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>
            </Form>
          </Spin>

        </Col>
      </Row>

    </>
  )
}

const mapStateToProps = state => ({
  user: state.userState.user
})

export default connect(mapStateToProps)(ProfilePage);