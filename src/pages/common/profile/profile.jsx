import { Avatar, Row, Col } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

const ProfilePage = props => {
  const { user } = props;

  return (
    <>
      <Row>
        <Col flex={1}>
          <h3 className="text-xl">Hồ sơ cá nhân</h3>
          <Avatar src={user.avatar} />
        </Col>
        <Col flex={1}>
          <h3 className="text-xl">Đổi mật khẩu</h3>
        </Col>
      </Row>

    </>
  )
}

const mapStateToProps = state => ({
  user: state.userState
})

export default connect(mapStateToProps)(ProfilePage);