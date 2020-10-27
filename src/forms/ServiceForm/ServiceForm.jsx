import React, { useState, useEffect } from 'react';
import { Form, Input, Spin } from 'antd';
import { getServiceDetailsAPI } from 'services/admin/medical-service.service';

const ServiceForm = props => {
  const { form, onFinish, defaultService } = props;

  const [serviceDetail, setServiceDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  async function getServiceDetail(id) {
    try {
      setDetailLoading(true);
      const detailResponse = await getServiceDetailsAPI(id);
      const serviceDetail = detailResponse.data;
      setServiceDetail(serviceDetail);
    } catch (error) {
      console.log(error);
    } finally {
      setDetailLoading(false);
    }
  }

  async function getData() {
    if (defaultService?.id) {
      await Promise.all([
        getServiceDetail(defaultService.id),
      ]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (serviceDetail) {
      form.setFieldsValue({
        name: serviceDetail.name,
        price: serviceDetail.price,
      });
    }
  }, [serviceDetail, defaultService, form]);

  return (
    <Spin spinning={detailLoading}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}>

        <Form.Item label="Tên dịch vụ" name="name" initialValue={serviceDetail?.name}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" initialValue={serviceDetail?.price}>
          <Input type="number" suffix="VNĐ" />
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default ServiceForm;