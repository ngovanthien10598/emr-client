import React from 'react';
import { Form, Row, Col, Select, Button, Input } from 'antd';
import NumberFormat from 'react-number-format';
import { SaveOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Item, List } = Form;
const { Option } = Select;

const VisitServiceForm = props => {

  const { services, currentValues } = props;

  function onFinish(values) {
    // Transform array of indexes to array of objects
    values.emr_services = values.emr_services.map(service => ({ name: services[service.index].name, price: services[service.index].price }));
    props.onFinish(values);
  }

  return (
    <Form onFinish={onFinish} initialValues={currentValues}>
      <List name="emr_services">
        {
          (fields, { add, remove }) => (
            <>
              {
                fields.map((field, index) => (
                  <Row gutter={15} key={field.key} align="middle" className="mb-5">
                    <Col>{index + 1}</Col>
                    <Col flex={1}>
                      <Item {...field} name={[field.name, 'index']} fieldKey={[field.fieldKey, 'index']} style={{margin: 0}} rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                        <Select placeholder="Chọn dịch vụ">
                          {
                            services.map((_, index) => (
                              <Option value={index} key={services[index].id}>
                                {services[index].name} (<NumberFormat displayType="text" thousandSeparator=" " value={services[index].price} suffix=" VNĐ" />)
                              </Option>
                            ))
                          }
                        </Select>
                      </Item>
                    </Col>
                    <Col>
                          <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Col>
                  </Row>
                ))
              }
              <Item>
                <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined />}>Thêm dịch vụ</Button>
              </Item>
            </>
          )
        }
      </List>

      <div>
        <Button htmlType="submit" icon={<SaveOutlined />}>Lưu</Button>
      </div>
    </Form>
  )
}

export default VisitServiceForm;