import React, { useState } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Item, useForm } = Form;

const VisitLivingFunctionForm = props => {

  const { currentValues} = props;
  const [bmi, setBmi] = useState(currentValues?.bmi || 0.0);

  const [form] = useForm();
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

  function onFinish(values) {
    values.bmi = bmi;
    props.onFinish(values);
  }

  return (
    <Form layout="vertical" form={form} onChange={getBMI} onFinish={onFinish}>
      <Row justify="start" gutter={15}>
        {
          row1.map(field => (
            <Col flex="0 0 243px" key={field.name}>
              <Item name={field.name} key={field.name} rules={[{ required: true, message: "Vui lòng nhập trường này" }]} initialValue={currentValues[field.name]}>
                <Input type={field.name !== "pressure" ? "number" : "text"} placeholder={field.text} suffix={field.unit} />
              </Item>
            </Col>
          ))
        }
      </Row>
      <Row justify="start" gutter={15}>
        {
          row2.map(field => (
            <Col flex="0 0 243px" key={field.name}>
              <Item name={field.name} key={field.name} rules={[{ required: true, message: "Vui lòng nhập trường này" }]} initialValue={currentValues[field.name]}>
                <Input type="number" placeholder={field.text} suffix={field.unit} />
              </Item>
            </Col>
          ))
        }
      </Row>
      <div className="mb-3">
        <strong>BMI: </strong>{bmi.toFixed(2)} ({getBMIDesc()})
      </div>
      <div>
        <Button icon={<SaveOutlined />} htmlType="submit">Lưu</Button>
      </div>
    </Form>
  )
}

export default VisitLivingFunctionForm;