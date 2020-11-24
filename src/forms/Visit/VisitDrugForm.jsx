import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { getDrugsAPI as adminGetDrugsAPI } from 'services/admin/drug.service';
import { getDrugsAPI } from 'services/user/drug.service';

const { Item } = Form;
const { Option } = Select;

const VisitDrugForm = props => {
  const { form, user, categories, instructions } = props;

  const [drugs, setDrugs] = useState([]);
  const [drugLoading, setDrugLoading] = useState(false);

  async function getDrugsByCategory(category) {
    try {
      setDrugLoading(true);
      let drugResponse;
      if (user.role === "admin") {
        drugResponse = await adminGetDrugsAPI({ drug_category: category });
      } else {
        drugResponse = await getDrugsAPI({ drug_category: category });
      }
      setDrugs(drugResponse.data.results);
    } catch (error) {

    } finally {
      setDrugLoading(false);
    }
  }

  function handleCategoryChange(category) {
    getDrugsByCategory(category);
  }

  return (
    <Form layout="vertical">
      <Row gutter={5}>
        <Col flex="0 0 220px">
          <Item label="Nhóm thuốc">
            <Select onChange={handleCategoryChange}>
              {
                categories.map(cat => (
                  <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                ))
              }
            </Select>
          </Item>
        </Col>
        <Col flex="0 0 220px">
          <Item label="Thuốc">
            <Select loading={drugLoading}>
              {
                drugs.map(drug => (
                  <Option key={drug.id} value={drug.id}>{drug.code}. {drug.name}</Option>
                ))
              }
            </Select>
          </Item>
        </Col>
        <Col flex="0 0 120px">
          <Item label="Cách dùng" style={{ minWidth: 200 }}>
            <Select>
              {
                instructions.map(ins => (
                  <Option key={ins.id} value={ins.id}>{ins.instruction}</Option>
                ))
              }
            </Select>
          </Item>
        </Col>
      {/* </Row> */}
      {/* <Row gutter={15}> */}
      <Col flex="0 0 100px">
        <Item label="Số ngày">
          <Input type="number" />
        </Item>
      </Col>
      <Col flex="0 0 80px">
        <Item label="Sáng">
          <Input type="number" />
        </Item>
      </Col>
      <Col flex="0 0 80px">
        <Item label="Trưa">
          <Input type="number" />
        </Item>
      </Col>
      <Col flex="0 0 80px">
        <Item label="Chiều">
          <Input type="number" />
        </Item>
      </Col>
      <Col flex="0 0 80px">
        <Item label="Tối">
          <Input type="number" />
        </Item>
      </Col>
      </Row>

    </Form>
  )
}

export default VisitDrugForm;