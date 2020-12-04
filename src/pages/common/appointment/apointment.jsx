import React from 'react';
import { Calendar, PageHeader, Row, Col } from 'antd';

const AppointmentPage = () => {
  return (
    <>
      <PageHeader title="Lịch hẹn" />
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