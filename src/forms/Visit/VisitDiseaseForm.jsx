import React, { useState, useEffect } from 'react';
import { Form, Select, Row, Col } from 'antd';
import { getDrugsAPI } from 'services/user/drug.service';
import { getDrugsAPI as adminGetDrugsAPI } from 'services/admin/drug.service';
import TextArea from 'antd/lib/input/TextArea';

const { Item } = Form;
const { Option } = Select;

const VisitDiseaseForm = props => {
  const { form, categories, user } = props;
  const [localCategories, setLocalCategories] = useState(categories);
  const [drugData, setDrugData] = useState(null);
  const [drugLoading, setDrugLoading] = useState(false);

  async function getDrugsDataByCategory(category) {
    try {
      setDrugLoading(true);
      setDrugData(null);
      let drugResponse;
      if (user.role === "admin") {
        drugResponse = await adminGetDrugsAPI({ drug_category: category });
      } else {
        drugResponse = await getDrugsAPI({ drug_category: category });
      }
      setDrugData(drugResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setDrugLoading(false);
    }
  }

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories])

  function handleCatSearch(value) {
    console.log(value);

    if (value) {
      const filterArr = categories.filter(cat => cat.name.includes(value));
      console.log(filterArr);
      setLocalCategories(filterArr);
    } else {
      setLocalCategories(categories);
    }
  }

  function handleCatChange(value) {
    if (value) {
      getDrugsDataByCategory(value);
    }
  }

  return (
    <Form form={form} layout="vertical">
      <Item label="Triệu chứng">
        <TextArea rows={2} />
      </Item>
      <Row gutter={15}>
        <Col flex={1}>
          <Item label="Bệnh">
            <Select placeholder="Nhóm bệnh" showSearch onSearch={handleCatSearch} onChange={handleCatChange}>
              {
                localCategories.map(cat => (
                  <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                ))
              }
            </Select>
          </Item>
        </Col>
        <Col flex={5}>
          <Item label=" ">
            <Select placeholder="Bệnh" loading={drugLoading}>
              {
                drugData?.results.map(drug => (
                  <Option key={drug.id} value={drug.id}>{drug.name}</Option>
                ))
              }
            </Select>
          </Item>
        </Col>
      </Row>
      <Item label="Ghi chú">
        <TextArea rows={2} />
      </Item>
    </Form>
  )
}

export default VisitDiseaseForm;