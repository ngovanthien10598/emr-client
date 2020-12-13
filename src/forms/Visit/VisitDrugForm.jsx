import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
import { getDrugsAPI as adminGetDrugsAPI } from 'services/admin/drug.service';
import { getDrugsAPI } from 'services/user/drug.service';
import { PlusOutlined, MinusCircleOutlined, SaveOutlined } from '@ant-design/icons';

const { Item, List, useForm } = Form;
const { Option } = Select;

const VisitDrugForm = props => {
  const { user, categories, instructions, currentValues, loading } = props;

  const [drugs, setDrugs] = useState([]);
  const [drugLoading, setDrugLoading] = useState(false);
  const [form] = useForm();

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

  function handleTotalFocus() {
    console.log(form.getFieldValue('numberOfDays'));
    console.log(form.getFieldValue('morning'));
    console.log(form.getFieldValue('afternoon'));
    console.log(form.getFieldValue('evening'));
    console.log(form.getFieldValue('night'));
  }

  function onFinish(values) {
    values.emr_drugs = values.emr_drugs.map(drug => {
      const currentDrug = drugs.find(d => d.name === drug.drug);
      drug.price = currentDrug.price;
      return drug;
    })
    props.onFinish(values);
  }

  return (
    <Form layout="vertical" onFinish={onFinish} form={form} initialValues={currentValues}>
      <List name="emr_drugs">
        {(fields, { add, remove }) => (
          <>
            {
              fields.map((field, index) => (
                <Row gutter={15} key={field.key} align="middle">
                  <Col>{index + 1}</Col>
                  <Col flex="0 0 220px">
                    <Item
                      {...field}
                      label="Nhóm thuốc"
                      name={[field.name, 'drugCategory']}
                      fieldKey={[field.fieldKey, 'drugCategory']}
                      rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                      <Select onChange={handleCategoryChange}>
                        {
                          categories.map(cat => (
                            <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                          ))
                        }
                      </Select>
                    </Item>
                  </Col>
                  <Col flex="1 0 220px">
                    <Item
                      {...field}
                      label="Thuốc"
                      name={[field.name, 'drug']}
                      fieldKey={[field.fieldKey, 'drug']}
                      rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                      <Select loading={drugLoading}>
                        {
                          drugs.map(drug => (
                            <Option key={drug.id} value={drug.name}>{drug.code}. {drug.name}</Option>
                          ))
                        }
                      </Select>
                    </Item>
                  </Col>
                  <Col flex="0 0 120px">
                    <Item
                      {...field}
                      name={[field.name, 'drugInstruction']}
                      fieldKey={[field.fieldKey, 'drugInstruction']}
                      rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                      label="Cách dùng"
                      style={{ minWidth: 200 }}>
                      <Select>
                        {
                          instructions.map(ins => (
                            <Option key={ins.id} value={ins.instruction}>{ins.instruction}</Option>
                          ))
                        }
                      </Select>
                    </Item>
                  </Col>
                  {/* </Row> */}
                  {/* <Row gutter={15}> */}
                  <Col flex="0 0 80px">
                    <Item
                      {...field}
                      name={[field.name, 'numberOfDays']}
                      fieldKey={[field.fieldKey, 'numberOfDays']}
                      rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                      label="Số ngày">
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Item label="Sáng" name={[field.name, 'morning']}>
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Item label="Trưa" name={[field.name, 'afternoon']}>
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Item label="Chiều" name={[field.name, 'evening']}>
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Item label="Tối" name={[field.name, 'night']}>
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Item
                      {...field}
                      label="Số lượng"
                      name={[field.name, 'total']}
                      fieldKey={[field.fieldKey, 'total']}>
                      <Input type="number" onFocus={handleTotalFocus} />
                    </Item>
                  </Col>
                  <Col>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Col>
                </Row>
              ))

            }
            <Item>
              <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined />}>Thêm đơn thuốc</Button>
            </Item>
          </>
        )}
      </List>

      <div>
        <Button loading={loading} htmlType="submit" icon={<SaveOutlined />}>Lưu</Button>
      </div>
    </Form>
  )
}

export default VisitDrugForm;