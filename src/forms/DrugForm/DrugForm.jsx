import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import { getDrugCategoryAPI } from 'services/admin/drug-category.service';
import { getDrugUnitsAPI } from 'services/admin/drug-unit.service';
import { getDrugDetailsAPI } from 'services/admin/drug.service';

const DrugForm = props => {
  const { form, onFinish, defaultDrug } = props;

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [drugDetail, setDrugDetail] = useState(null);
  const [catLoading, setCatLoading] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  async function getDrugCategories() {
    try {
      setCatLoading(true);
      const catResponse = await getDrugCategoryAPI();
      setCategories(catResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setCatLoading(false);
    }
  }

  async function getDrugUnits() {
    try {
      setUnitLoading(true);
      const unitResponse = await getDrugUnitsAPI();
      setUnits(unitResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setUnitLoading(false);
    }
  }

  async function getDrugDetail(id) {
    try {
      setDetailLoading(true);
      const detailResponse = await getDrugDetailsAPI(id);
      const drugDetail = detailResponse.data;
      setDrugDetail(drugDetail);
      setCategories(prevCats => {
        const index = prevCats.findIndex(cat => cat.id === defaultDrug.drug_category);
        if (index > -1) {
          prevCats[index] = drugDetail.drug_category;
          return prevCats;
        } else {
          return [...[drugDetail.drug_category], ...prevCats];
        }
      });
      setUnits(prevUnits => {
        const index = prevUnits.findIndex(u => u.id === defaultDrug.drug_unit);
        if (index > -1) {
          prevUnits[index] = drugDetail.drug_unit;
          return prevUnits;
        } else {
          return [...[drugDetail.drug_unit], ...prevUnits];
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDetailLoading(false);
    }
  }

  async function getData() {
    if (defaultDrug?.id) {
      await Promise.all([
        getDrugDetail(defaultDrug.id),
        getDrugCategories(),
        getDrugUnits()
      ]);

    } else {
      await Promise.all([
        getDrugCategories(),
        getDrugUnits()
      ])
    }

  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (drugDetail) {
      form.setFieldsValue({
        code: drugDetail.code,
        name: drugDetail.name,
        price: drugDetail.price,
        drug_category: drugDetail.drug_category.id,
        drug_unit: drugDetail.drug_unit.id
      });
    }
  }, [drugDetail, defaultDrug]);

  return (
    <Spin spinning={detailLoading}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item label="Mã thuốc" name="code" initialValue={drugDetail?.code}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên thuốc" name="name" initialValue={drugDetail?.name}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" initialValue={drugDetail?.price}>
          <Input type="number" suffix="VNĐ" />
        </Form.Item>

        <Form.Item label="Loại thuốc" name="drug_category" initialValue={drugDetail?.drug_category.id}>
          <Select loading={catLoading}>
            {
              categories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item label="Đơn vị tính" name="drug_unit" initialValue={drugDetail?.drug_unit.id}>
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

export default DrugForm;