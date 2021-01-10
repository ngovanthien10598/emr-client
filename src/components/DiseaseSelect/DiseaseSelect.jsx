import React, { useState } from 'react';
import { Form, Select, Row, Col, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DiseaseSelect = ({ value = { category: null, disease: null }, onChange, ...props }) => {

  const { label, clearable } = props;
  const [selectedCat, setSelectedCat] = useState('');

  const [diseaseCategories, setDiseaseCategories] = useState(props.diseaseCategories);
  const [diseases, setDiseases] = useState(props.diseases);

  function handleCatChange(id) {
    setSelectedCat(id);
    onChange({ ...value, category: id })
  }

  function handleChange(v) {
    onChange({ ...value, disease: v });
  }

  return (
    <Row align="middle" gutter={15} className="flex-no-wrap">
      {
        label &&
        <Col flex="0 0 150px">{label}</Col>
      }
      <Col flex="0 0 300px" style={{ maxWidth: 300 }}>
        <Select placeholder="Nhóm bệnh" onChange={handleCatChange} value={value?.category} showSearch>
          {
            diseaseCategories.map(cat => {
              return <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
            })
          }
        </Select>
      </Col>
      <Col flex="1 1 auto">
        <Select placeholder="Bệnh" onChange={handleChange} value={value?.disease}>
          {
            diseases?.filter(d => selectedCat === '' || d.disease_category === selectedCat).map(d => {
              return <Select.Option key={d.id} value={d.name}>{d.name}</Select.Option>
            })
          }
        </Select>
      </Col>
      {
        clearable &&
        <Col>
          <Button icon={<DeleteOutlined />} onClick={() => onChange({ category: null, disease: null })}></Button>
        </Col>
      }
    </Row>
  )
}

export default DiseaseSelect;