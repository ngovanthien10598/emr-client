import React from 'react';
import { Calendar, Row, Col } from 'antd';

const AppointmentPage = () => {
  return (
    <>
      <h3 className="text-xl">Lịch hẹn</h3>
      <Row>
        <Col flex="1">
          <Calendar mode="month" locale="vi" />
        </Col>

        <Col flex="0 0 300px">

        </Col>
      </Row>
    </>
  )
}

export default AppointmentPage;