import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import { getUserDetailsAPI } from 'services/admin/user.service';

const UserForm = props => {
  const { form, onFinish, defaultUser } = props;

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [catLoading, setCatLoading] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  async function getUserDetail(id) {
    try {
      setDetailLoading(true);
      const detailResponse = await getUserDetailsAPI(id);
      const userDetail = detailResponse.data;
      setUserDetail(userDetail);
      setCategories(prevCats => {
        const index = prevCats.findIndex(cat => cat.id === defaultUser.user_category);
        if (index > -1) {
          prevCats[index] = userDetail.user_category;
          return prevCats;
        } else {
          return [...[userDetail.user_category], ...prevCats];
        }
      });
      setUnits(prevUnits => {
        const index = prevUnits.findIndex(u => u.id === defaultUser.user_unit);
        if (index > -1) {
          prevUnits[index] = userDetail.user_unit;
          return prevUnits;
        } else {
          return [...[userDetail.user_unit], ...prevUnits];
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDetailLoading(false);
    }
  }

  async function getData() {
    if (defaultUser?.id) {
      await Promise.all([
        getUserDetail(defaultUser.id),
      ]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue({
        code: userDetail.code,
        name: userDetail.name,
        price: userDetail.price,
        user_category: userDetail.user_category.id,
        user_unit: userDetail.user_unit.id
      });
    }
  }, [userDetail, defaultUser, form]);

  return (
    <Spin spinning={detailLoading}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item label="Mã thuốc" name="code" initialValue={userDetail?.code}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên thuốc" name="name" initialValue={userDetail?.name}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" initialValue={userDetail?.price}>
          <Input type="number" suffix="VNĐ" />
        </Form.Item>

        <Form.Item label="Loại thuốc" name="user_category" initialValue={userDetail?.user_category.id}>
          <Select loading={catLoading}>
            {
              categories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item label="Đơn vị tính" name="user_unit" initialValue={userDetail?.user_unit.id}>
          <Select loading={unitLoading}>
            {
              units.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default UserForm;