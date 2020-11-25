import React, { useState, useEffect } from 'react';
import { Form, Select, Row, Col, Button } from 'antd';
import { getDiseasesAPI } from 'services/user/disease.service';
import { getDiseasesAPI as adminGetDiseasesAPI } from 'services/admin/disease.service';
import { SaveOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Item, List } = Form;
const { Option } = Select;

const VisitDiseaseForm = props => {
  const { form, categories, user, currentValues } = props;
  const [localCategories, setLocalCategories] = useState(categories);
  const [diseases, setDiseases] = useState(null);
  const [diseaseLoading, setDiseaseLoading] = useState(false);

  async function getDiseasesByCategory(category) {
    try {
      setDiseaseLoading(true);
      setDiseases(null);
      let diseaseResponse;
      if (user.role === "admin") {
        diseaseResponse = await adminGetDiseasesAPI(category);
      } else {
        diseaseResponse = await getDiseasesAPI(category);
      }
      setDiseases(diseaseResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setDiseaseLoading(false);
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
      getDiseasesByCategory(value);
    }
  }

  function onFinish(values) {
    props.onFinish(values);
  }

  return (
    <Form form={form} name="dynamic_form" layout="vertical" onFinish={onFinish} initialValues={currentValues}>
      <List name="emr_diseases">
        {(fields, { add, remove }) => (
          <>
            {
              fields.map((field, index) => (
                <Row gutter={15} key={field.key} align="middle" className="mb-5">
                  <Col>{index + 1}</Col>
                  <Col flex="0 0 300px">
                    <Item
                      {...field}
                      name={[field.name, 'diseaseCategory']}
                      fieldKey={[field.fieldKey, 'diseaseCategory']}
                      rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                      style={{margin: 0}}>
                      <Select
                        showSearch onSearch={handleCatSearch}
                        placeholder="Nhóm bệnh"
                        onChange={handleCatChange}>
                        {
                          localCategories.map(cat => (
                            <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                          ))
                        }
                      </Select>
                    </Item>
                  </Col>
                  <Col flex={5}>
                    <Item
                      {...field}
                      name={[field.name, 'disease']}
                      fieldKey={[field.fieldKey, 'disease']}
                      rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                      style={{margin: 0}}>
                      <Select loading={diseaseLoading} placeholder="Bệnh">
                        {
                          diseases?.results.map(disease => (
                            <Option key={disease.id} value={disease.name}>{disease.name}</Option>
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
              <Button type="dashed" block onClick={() => add()}>Thêm bệnh</Button>
            </Item>
          </>
        )
        }
      </List>

      <div>
        <Button htmlType="submit" icon={<SaveOutlined />}>Lưu</Button>
      </div>
    </Form>
  )
}

export default VisitDiseaseForm;