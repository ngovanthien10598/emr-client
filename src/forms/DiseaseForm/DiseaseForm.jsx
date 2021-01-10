import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import { getDiseaseCategoryAPI } from 'services/admin/disease-category.service';
import { getDiseaseDetailsAPI } from 'services/admin/disease.service';

const DiseaseForm = props => {
  const { form, onFinish, defaultDisease } = props;

  const [categories, setCategories] = useState([]);
  const [diseaseDetail, setDiseaseDetail] = useState(null);
  const [catLoading, setCatLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  async function getDiseaseCategories() {
    try {
      setCatLoading(true);
      const catResponse = await getDiseaseCategoryAPI();
      setCategories(catResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setCatLoading(false);
    }
  }

  async function getDiseaseDetail(id) {
    try {
      setDetailLoading(true);
      const detailResponse = await getDiseaseDetailsAPI(id);
      const diseaseDetail = detailResponse.data;
      setDiseaseDetail(diseaseDetail);
      setCategories(prevCats => {
        const index = prevCats.findIndex(cat => cat.id === defaultDisease.disease_category);
        if (index > -1) {
          prevCats[index] = diseaseDetail.disease_category;
          return prevCats;
        } else {
          return [...[diseaseDetail.disease_category], ...prevCats];
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDetailLoading(false);
    }
  }

  async function getData() {
    if (defaultDisease?.id) {
      await Promise.all([
        getDiseaseDetail(defaultDisease.id),
        getDiseaseCategories(),
      ]);

    } else {
      await Promise.all([
        getDiseaseCategories(),
      ])
    }

  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (diseaseDetail) {
      form.setFieldsValue({
        code: diseaseDetail.code,
        name: diseaseDetail.name,
        disease_category: diseaseDetail.disease_category.id,
      });
    }
  }, [diseaseDetail, defaultDisease, form]);

  return (
    <Spin spinning={detailLoading}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item label="Mã bệnh" name="code" initialValue={diseaseDetail?.code}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên bệnh" name="name" initialValue={diseaseDetail?.name}>
          <Input />
        </Form.Item>

        <Form.Item label="Nhóm bệnh" name="disease_category" initialValue={diseaseDetail?.disease_category.id}>
          <Select loading={catLoading}>
            {
              categories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default DiseaseForm;