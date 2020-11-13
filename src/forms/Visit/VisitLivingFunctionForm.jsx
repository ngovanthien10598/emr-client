import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col } from 'antd';

const { Item } = Form;

const VisitLivingFunctionForm = props => {

  const { form, onFinish } = props;
  const [bmi, setBmi] = useState(0.0);

  const row1 = [
    {
      name: "heartbeat",
      text: "Mạch",
      unit: "lần/phút"
    },
    {
      name: "temp",
      text: "Nhiệt độ",
      unit: "°C"
    },
    {
      name: "pressure",
      text: "Huyết áp",
      unit: "mmHg"
    },
  ]

  const row2 = [
    {
      name: "breathing",
      text: "Nhịp thở",
      unit: "lần/phút"
    },
    {
      name: "height",
      text: "Chiều cao",
      unit: "cm"
    },
    {
      name: "weight",
      text: "Cân nặng",
      unit: "kg"
    },
  ]

  function getBMI() {
    const heightStr = form.getFieldValue('height');
    const weightStr = form.getFieldValue('weight');
    const height = Number(heightStr);
    const weight = Number(weightStr);
    console.log(height);
    console.log(weight);

    if (!height || !weight || weight <= 0) {
      setBmi(0.00);
    } else {
      setBmi(weight / Math.pow(height * 0.01, 2));
    }
  }

  function getBMIDesc() {
    let result = "";

    if (bmi === 0) {
      return "Không có dữ liệu"
    } else if (bmi < 16) {
      return "Gầy độ III";
    } else if (bmi >= 16 && bmi < 17) {
      return "Gầy độ II";
    } else if (bmi >= 17 && bmi < 18.5) {
      return "Gầy độ I";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Bình thường";
    } else if (bmi >= 25 && bmi < 30) {
      return "Thừa cân";
    } else if (bmi >= 30 && bmi < 35) {
      return "Béo phì độ I";
    } else if (bmi >= 35 && bmi < 40) {
      return "Béo phì độ II";
    } else {
      return "Béo phì độ III";
    }
  }

  return (
    <Form layout="vertical" form={form} onChange={getBMI}>
      <Row justify="start" gutter={15}>
        {
          row1.map(field => (
            <Col flex="0 0 243px">
              <Item name={field.name} key={field.name}>
                <Input placeholder={field.text} suffix={field.unit} />
              </Item>
            </Col>
          ))
        }
      </Row>
      <Row justify="start" gutter={15}>
        {
          row2.map(field => (
            <Col flex="0 0 243px">
              <Item name={field.name} key={field.name}>
                <Input placeholder={field.text} suffix={field.unit} />
              </Item>
            </Col>
          ))
        }
      </Row>
      <div><strong>BMI: </strong>{bmi.toFixed(2)} ({getBMIDesc()})</div>
    </Form>
  )
}

export default VisitLivingFunctionForm;