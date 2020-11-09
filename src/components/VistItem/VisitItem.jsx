import React from 'react';
import { Row, Col, List } from 'antd';
import classnames from 'classnames';

import styles from './VisitItem.module.scss';

const VisitItem = ({ selectedId, visit, ...props }) => {

  const rowClasses = classnames(
    '-ml-3 -mr-3',
  )
  return (
    <List.Item {...props} className={rowClasses}>
      <Row className={`${styles['row']} pl-3`}>
        <Col className={styles['col']}>{visit.visit_number}</Col>
        <Col className={styles['col']}>{visit.patient.first_name} {visit.patient.last_name}</Col>
        <Col className={styles['col']}>{visit.patient.gender}</Col>
      </Row>
    </List.Item>
  )
}

export default VisitItem;