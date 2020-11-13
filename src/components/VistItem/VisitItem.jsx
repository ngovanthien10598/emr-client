import React from 'react';
import { Row, Col, List, Button } from 'antd';
import classnames from 'classnames';

import styles from './VisitItem.module.scss';

const VisitItem = ({ visit, onPatientClick, ...props }) => {

  const rowClasses = classnames(
    '-ml-3 -mr-3',
  )

  function handlePatientClick() {
    onPatientClick(visit)
  }

  return (
    <List.Item {...props} className={rowClasses} onClick={handlePatientClick}>
      <Row className={`${styles['row']} pl-3`} align="middle">
        <Col className={styles['col']}>{visit.visit_number}</Col>
        <Col className={styles['col']}>{visit.patient.first_name} {visit.patient.last_name}</Col>
        <Col className={styles['col']}>{visit.patient.gender}</Col>
        <Col><Button>Khám</Button></Col>
      </Row>
    </List.Item>
  )
}

export default VisitItem;