import React from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { SaveOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Item, List } = Form;
const { Option } = Select;

const VisitServiceForm = props => {

  const { services, currentValues, loading } = props;

  function onFinish(values) {
    values.emr_services = values.emr_services.map(service => services.find(s => s.id === service.id));
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
                      <Item {...field} name={[field.name, 'id']} fieldKey={[field.fieldKey, 'id']} style={{margin: 0}} rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                        <Select placeholder="Chọn dịch vụ">
                          {
                            services.map((service, index) => (
                              <Option value={service.id} key={service.id}>
                                {service.name}
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
        <Button loading={loading} htmlType="submit" icon={<SaveOutlined />}>Lưu</Button>
      </div>
    </Form>
  )
}

export default VisitServiceForm;