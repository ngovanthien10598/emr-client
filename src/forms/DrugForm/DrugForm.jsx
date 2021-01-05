import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import { getDrugCategoryAPI } from 'services/admin/drug-category.service';
import { getDrugUnitsAPI } from 'services/admin/drug-unit.service';
import { getDrugDetailsAPI } from 'services/admin/drug.service';
import { getDrugRouteAPI } from 'services/admin/drug-route.service';
import { getDrugDosageFormAPI } from 'services/admin/drug-dosage-form.service';
import { requiredRule } from 'constant/formRules';

const DrugForm = props => {
  const { form, onFinish, defaultDrug } = props;

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [forms, setForms] = useState([]);
  const [drugDetail, setDrugDetail] = useState(null);

  const [catLoading, setCatLoading] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
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

  async function getDrugRoutes() {
    try {
      setRouteLoading(true);
      const routeResponse = await getDrugRouteAPI();
      setRoutes(routeResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRouteLoading(false);
    }
  }

  async function getDrugDosageForms() {
    try {
      setFormLoading(true);
      const formResponse = await getDrugDosageFormAPI();
      setForms(formResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFormLoading(false);
    }
  }



  async function getDrugDetail(id) {
    try {
      setDetailLoading(true);
      const detailResponse = await getDrugDetailsAPI(id);
      const drugDetail = detailResponse.data;
      setDrugDetail(drugDetail);
      setCategories(prevCats => {
        const index = prevCats.findIndex(cat => cat.id === defaultDrug.drug_category.id);
        if (index > -1) {
          prevCats[index] = drugDetail.drug_category;
          return prevCats;
        } else {
          return [...[drugDetail.drug_category], ...prevCats];
        }
      });
      setUnits(prevUnits => {
        const index = prevUnits.findIndex(u => u.id === defaultDrug.drug_unit.id);
        if (index > -1) {
          prevUnits[index] = drugDetail.drug_unit;
          return prevUnits;
        } else {
          return [...[drugDetail.drug_unit], ...prevUnits];
        }
      });
      setRoutes(prevRoutes => {
        const index = prevRoutes.findIndex(r => r.id === defaultDrug.drug_route.id);
        if (index > -1) {
          prevRoutes[index] = drugDetail.drug_route;
          return prevRoutes;
        } else {
          return [...[drugDetail.drug_route], ...prevRoutes];
        }
      });
      setForms(prevForms => {
        const index = prevForms.findIndex(f => f.id === defaultDrug.drug_dosage_form.id);
        if (index > -1) {
          prevForms[index] = drugDetail.drug_dosage_form;
          return prevForms;
        } else {
          return [...[drugDetail.drug_dosage_form], ...prevForms];
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
        getDrugUnits(),
        getDrugRoutes(),
        getDrugDosageForms()
      ]);

    } else {
      await Promise.all([
        getDrugCategories(),
        getDrugUnits(),
        getDrugRoutes(),
        getDrugDosageForms()
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
        price: drugDetail.price || 0,
        drug_category_id: drugDetail.drug_category.id,
        drug_unit_id: drugDetail.drug_unit.id,
        drug_dosage_form_id: drugDetail.drug_dosage_form.id,
        drug_route_id: drugDetail.drug_route.id,
        strength: drugDetail.strength
      });
    }
  }, [drugDetail, defaultDrug, form]);

  return (
    <Spin spinning={detailLoading}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item label="Mã thuốc" name="code" initialValue={drugDetail?.code} rules={[requiredRule()]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên thuốc" name="name" initialValue={drugDetail?.name} rules={[requiredRule()]}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price" initialValue={0} hidden>
          <Input type="number" suffix="VNĐ" value={0} />
        </Form.Item>

        <Form.Item label="Nhóm thuốc" name="drug_category_id" initialValue={drugDetail?.drug_category.id} rules={[requiredRule()]}>
          <Select loading={catLoading}>
            {
              categories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item label="Đơn vị tính" name="drug_unit_id" initialValue={drugDetail?.drug_unit.id} rules={[requiredRule()]}>
          <Select loading={unitLoading}>
            {
              units.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item label="Đường dùng" name="drug_route_id" initialValue={drugDetail?.drug_route.id} rules={[requiredRule()]}>
          <Select loading={routeLoading}>
            {
              routes.map(route => (
                <Select.Option key={route.id} value={route.id}>{route.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="Dạng bào chế" name="drug_dosage_form_id" initialValue={drugDetail?.drug_dosage_form.id} rules={[requiredRule()]}>
          <Select loading={formLoading}>
            {
              forms.map(f => (
                <Select.Option key={f.id} value={f.id}>{f.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="Hàm lượng/nồng độ" name="strength" initialValue={drugDetail?.strength} rules={[requiredRule()]}>
          <Input />
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default DrugForm;