import React from 'react';
import classnames from 'classnames';
import styles from './Circle.module.scss';

const Circle = props => {

  const classes = classnames(
    styles.circle,
    { [styles['circle--success']]: props.color === 'success' }
  )

  return (
    <div className={classes}></div>
  )
}

export default Circle;