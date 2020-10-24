import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Icon from '@ant-design/icons';
import LoginIcon from 'components/Icons/LoginIcon';
import * as AuthService from 'services/auth/auth.service';
import Cookie from 'js-cookie';
import * as UserService from 'services/auth/user.service';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/actions/user.action';

const LoginForm = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const loginRes = await AuthService.login(values.email, values.password);
      const loginData = loginRes.data;

      const accessToken = loginData.access_token;
      const refreshToken = loginData.refresh_token;
      console.log(loginData);
      Cookie.set('EMR_token', accessToken, { expires: 3 / 24 }); // 3 hours
      Cookie.set('EMR_refresh', refreshToken, { expires: 7 }); // 7 days

      const profileRes = await UserService.getProfile();
      const profile = profileRes.data;
      dispatch(setUser(profile));

      switch (profile.role.id) {
        case 1:
          history.replace('/admin');
          break;
        case 2:
          history.replace('/physician');
          break;
        case 3:
          history.replace('/receiptionist');
          break;
        default:
          return history.replace('/user');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      className="login-form"
      layout="vertical"
      autoComplete="off"
      onFinish={handleSubmit}>

      <div className="text-center">

        <div className="login-form__header">
          <Icon component={LoginIcon} />
          <h1 className="text-3xl">Đăng nhập</h1>
        </div>

      </div>

      <Form.Item name="email">
        <Input type="email" placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" className="m-0">
        <Input.Password placeholder="Mật khẩu" />
        {/* <Button type="link"> */}
        {/* </Button> */}
      </Form.Item>
      <Link className="block mt-2 mb-6" to="/forgot-password">Quên mật khẩu</Link>

      <Form.Item>
        <Button loading={loading} block type="primary" size="large" htmlType="submit">Đăng nhập</Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;