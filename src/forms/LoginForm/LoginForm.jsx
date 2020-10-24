import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Icon from '@ant-design/icons';
import LoginIcon from 'components/Icons/LoginIcon';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from 'store/actions/auth.action';
import { getRedirectPath } from 'utils/routing';

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  const userState = useSelector(state => state.userState);
  const user = userState.user;

  function handleSubmit(values) {
    dispatch(loginAction(values.email, values.password));
  }

  useEffect(() => {
    if (user && user.role) {
      const redirectPath = getRedirectPath(user.role);
      console.log(redirectPath);
      history.replace(redirectPath);
    }
  }, [user]);

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
        <Button loading={authState.loginLoading || userState.getProfileLoading} block type="primary" size="large" htmlType="submit">Đăng nhập</Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm;