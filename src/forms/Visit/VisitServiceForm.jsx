import React from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import NumberFormat from 'react-number-format';
import { SaveOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Item, List } = Form;
const { Option } = Select;

const VisitServiceForm = props => {

  const { services, currentValues } = props;

  return (
    <Form onFinish={props.onFinish} initialValues={currentValues}>
      <List name="emr_services">
        {
          (fields, { add, remove }) => (
            <>
              {
                fields.map((field, index) => (
                  <Row gutter={15} key={field.key} align="middle" className="mb-5">
                    <Col>{index + 1}</Col>
                    <Col flex={1}>
                      <Item {...field} name={[field.name, 'service']} fieldKey={[field.fieldKey, 'service']} style={{margin: 0}} rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                        <Select placeholder="Chọn dịch vụ">
                          {
                            services.map(service => (
                              <Option value={service.name} key={service.id}>
                                {service.name} (<NumberFormat displayType="text" thousandSeparator=" " value={service.price} suffix=" VNĐ" />)
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