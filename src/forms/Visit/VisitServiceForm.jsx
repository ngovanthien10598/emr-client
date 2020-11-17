import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { getServicesAPI } from 'services/user/medical-service.service';
import { getServicesAPI as adminGetServicesAPI } from 'services/admin/medical-service.service';
import NumberFormat from 'react-number-format';

const { Item } = Form;
const { Option } = Select;

const VisitServiceForm = props => {

  const { form, user } = props;

  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(false);

  async function getServices() {
    try {
      setServiceLoading(true);
      let serviceResponse;
      if (user.role === "admin") {
        serviceResponse = await adminGetServicesAPI();
      } else {
        serviceResponse = await getServicesAPI();
      }
      setServices(serviceResponse.data);
    } catch (error) {
      // 
    } finally {
      setServiceLoading(false);
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Form>
      <Row gutter={15}>
        <Col flex={1}>
          <Item label="Dịch vụ">
            <Select loading={serviceLoading}>
              {
                services.map(service => (
                  <Option value={service.id} key={service.id}>
                    {service.name} (<NumberFormat displayType="text" thousandSeparator=" " value={service.price} suffix=" VNĐ" />)
                  </Option>
                ))
              }
            </Select>
          </Item>
        </Col>
        <Col>
          <Button htmlType="submit">Thêm</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default VisitServiceForm;