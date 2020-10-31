import React, { useState, useEffect } from 'react';
import EmailIcon from 'components/Icons/EmailIcon';
import Icon from '@ant-design/icons';
import { Alert, Button, Space, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { verifyEmailAPI } from 'services/auth/auth.service';

const VerifyPage = (props) => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { search } = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const token = urlSearchParams.get('token');

  function isValidToken(token = "") {
    const isValid = /[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/.test(token);
    console.log(isValid);
    return isValid;
  }

  async function verifyEmail(token) {
    try {
      setLoading(true);
      await verifyEmailAPI(token);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token && token.length > 0 && isValidToken(token)) {
      verifyEmail(token);
    }
  }, [search, token]);

  return (
    <main className="login-page">
      <div className="auth">
        <div className="auth__header text-center">
          <Icon component={EmailIcon} />
          <h1 className="text-3xl">Xác thực email</h1>
        </div>

        {
          loading &&
          <Space align="center" className="flex text-center justify-center">
            <Spin />
            <span>Vui lòng đợi</span>
          </Space>
        }

        {
          success &&
          <Alert
            showIcon
            type="success"
            message="Xác thực địa chỉ email thành công"
          />
        }

        {
          !isValidToken(token) &&
          <Alert
            showIcon
            type="error"
            message="URL không hợp lệ"
          />
        }

        {
          !!error &&
          <Alert
            showIcon
            type="error"
            message={error?.response?.data.message || "Có lỗi khi xác thực email, vui lòng thử lại"}
          />
        }

        <div className="text-center mt-5">
          <Button type="link">
            <Link to="/">Về trang chủ</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default VerifyPage;