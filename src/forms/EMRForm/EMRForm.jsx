import React from 'react';
import { Form, Row, Col, Input, Radio, Select, Button, Collapse, DatePicker, Divider, Space } from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import { quillToolbar } from 'constant/quill';
import VisitImagesForm from 'forms/Visit/VisitImagesForm';
import DiseaseSelect from 'components/DiseaseSelect/DiseaseSelect';
import { MinusCircleOutlined, PlusOutlined, SaveOutlined, FileDoneOutlined } from '@ant-design/icons';

const { Option } = Select;

const EMRForm = props => {

  const {
    emrForm,
    emr,
    diseaseCategories,
    diseases,
    drugCategories,
    drugLoading,
    drugInstructions,
    services,
    drugs,
    finishLoading,
  } = props;

  function getDateString(dateStr) {
    let result = "";
    const momentObj = moment(dateStr);
    result = `${momentObj.hour()} giờ ${momentObj.minute()} phút ngày ${momentObj.date()} tháng ${momentObj.month() + 1} năm ${momentObj.year()}`;
    return result;
  }

  return (
    <Form layout="vertical" form={emrForm} initialValues={
      { drugs: emr.medical_record.examination.drugs },
      { services: emr.medical_record.summary.services }
    }>

      <Row gutter={15}>
        {/* <Col flex={1}>
        <Form.Item label="Sở y tế" name="health_service_dept">
          <Input />
        </Form.Item>
      </Col> */}
        {/* <Col flex={1}>
        <Form.Item label="Bệnh viện" name="hospital">
          <Input />
        </Form.Item>
      </Col> */}
        <Col flex={1}>
          <Form.Item label="Phòng khám" name="room" initialValue={emr.room.name}>
            <Input readOnly />
          </Form.Item>
        </Col>
      </Row>

      <Collapse defaultActiveKey={["administrative", "present-complaint", "ask", "examination", "summary"]}>
        <Collapse.Panel header={<strong className="uppercase">i. Hành chính</strong>} key="administrative">
          <Row gutter={15}>
            <Col flex="0 0 33.33%">
              <Form.Item label="1. Họ và tên" name="fullname" initialValue={(emr.patient.first_name + " " + emr.patient.last_name).toUpperCase()}>
                <Input />
              </Form.Item>
            </Col>
            <Col flex="0 0 33.33%">
              <Form.Item label="2. Sinh ngày" name="dayOfBirth" initialValue={moment(emr.patient.DOB)}>
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col flex="0 0 33.33%">
              <Form.Item label="3. Giới tính" name="gender" initialValue={emr.patient.gender}>
                <Select>
                  <Select.Option value="Nam">Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col flex="0 0 33.33%">
              <Form.Item label="4. Nghề nghiệp" name="job">
                <Input />
              </Form.Item>
            </Col>
            <Col flex="0 0 33.33%">
              <Form.Item label="5. Dân tộc" name="ethnicity">
                <Input />
              </Form.Item>
            </Col>
            <Col flex="0 0 33.33%">
              <Form.Item label="6. Ngoại kiều" name="expatriate">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="7. Địa chỉ" name="address">
            <Input />
          </Form.Item>

          <Row gutter={15}>
            <Col flex="0 0 50%">
              <Form.Item label="8. Nơi làm việc" name="workplace">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="9. Đối tượng" name="object" initialValue="Khác">
                <Radio.Group>
                  <Radio value="BHYT">1. BHYT</Radio>
                  <Radio value="Thu phí">2. Thu phí</Radio>
                  <Radio value="Miễn phí">3. Miễn phí</Radio>
                  <Radio value="Khác">4. Khác</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col flex="0 0 50%">
              <Form.Item label="10. Giá trị BHYT" name="insurance_expirity">
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col flex="0 0 50%">
              <Form.Item label="Số thẻ BHYT" name="insurance_number">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={15}>
            <Col flex="0 0 50%">
              <Form.Item label="11. Họ tên, địa chỉ người nhà khi cần báo tin" name="family_member_and_address">
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
            <Col flex="0 0 50%">
              <Form.Item label="Điện thoại" initialValue={emr.patient.phone} name="phone">
                <Input />
              </Form.Item>
            </Col>
          </Row>


          <Form.Item label="12. Đến khám bệnh lúc" initialValue={getDateString(emr.created_at)} name="checkin">
            <Input readOnly />
          </Form.Item>

          <Row gutter={15}>
            <Col flex={1}>
              <Form.Item label="13. Chẩn đoán của nơi giới thiệu" name="previous_diagnose" initialValue={emr.medical_record.administrative.previous_diagnose}>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Nơi giới thiệu" name="come_from" initialValue={emr.medical_record.administrative.come_from || "Tự đến"}>
                <Radio.Group>
                  <Radio value="Y tế">1. Y tế</Radio>
                  <Radio value="Tự đến">2. Tự đến</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

        </Collapse.Panel>
        <Collapse.Panel header={<strong className="uppercase">II. Lý do vào viện</strong>} key="present-complaint">
          <Form.Item label="Lý do vào viện" name="present_complaint" initialValue={emr.medical_record.present_complaint}>
            <Input />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel header={<strong className="uppercase">iii. hỏi bệnh</strong>} key="ask">
          <Form.Item label="1. Quá trình bệnh lý" name="pathological_process" initialValue={emr.medical_record.ask.pathological_process}>
            {/* <Input.TextArea autoSize={{ minRows: 3, maxRows: 7 }} /> */}
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>
          <Form.Item label="2. Tiền sử bệnh" name="self_medical_history" className="mb-3" initialValue={emr.medical_record.ask.self_medical_history}>
            <Input placeholder="Bản thân" />
          </Form.Item>
          <Form.Item name="family_medical_history" initialValue={emr.medical_record.ask.family_medical_history}>
            <Input placeholder="Gia đình" />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel header={<strong className="uppercase">iv. khám bệnh</strong>} key="examination">
          <Row gutter={15} className="flex-no-wrap">
            <Col flex={1}>
              <Form.Item label="1. Toàn thân" name="body" initialValue={emr.medical_record.examination.body}>
                <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
              </Form.Item>
            </Col>
            <Col flex="0 0 auto">
              <Form.Item label="Dấu hiệu sinh tồn">
                {/* <div className="border border-solid border-gray-400 p-2"> */}
                <Form.Item className="mb-2" name="heartbeat" initialValue={emr.medical_record.examination.heartbeat}>
                  <Input addonBefore={<div style={{ width: 80 }}>Mạch</div>} suffix="lần/ph" />
                </Form.Item>
                <Form.Item className="mb-2" name="temperature" initialValue={emr.medical_record.examination.temperature}>
                  <Input addonBefore={<div style={{ width: 80 }}>Nhiệt độ</div>} suffix="°C" />
                </Form.Item>
                <Form.Item className="mb-2" name="blood_pressure" initialValue={emr.medical_record.examination.blood_pressure}>
                  <Input addonBefore={<div style={{ width: 80 }}>Huyết áp</div>} suffix="mmHg" />
                </Form.Item>
                <Form.Item className="mb-2" name="breathing" initialValue={emr.medical_record.examination.breathing}>
                  <Input addonBefore={<div style={{ width: 80 }}>Nhịp thở</div>} suffix="lần/ph" />
                </Form.Item>
                <Form.Item className="mb-0" name="weight" initialValue={emr.medical_record.examination.weight}>
                  <Input addonBefore={<div style={{ width: 80 }}>Câng nặng</div>} suffix="kg" />
                </Form.Item>
                {/* </div> */}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="2. Các bộ phận" name="partials" initialValue={emr.medical_record.examination.partials}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>

          <Form.Item label="3. Tóm tắt kết quả cận lâm sàng" name="subclinical_summary" initialValue={emr.medical_record.examination.subclinical_summary}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>

          <Form.Item label="4. Chẩn đoán ban đầu" name="initial_diagnose" initialValue={emr.medical_record.examination.initial_diagnose}>
            <DiseaseSelect diseaseCategories={diseaseCategories} diseases={diseases} />
          </Form.Item>

          <div className="mb-3">5. Đã xử lý (thuốc, chăm sóc)</div>

          <Form.List name="drugs">
            {(fields, { add, remove }) => (
              <>
                {
                  fields.map((field, index) => (
                    <Row gutter={15} key={field.key} align="middle">
                      <Col>{index + 1}</Col>
                      <Col flex="0 0 220px">
                        <Form.Item
                          {...field}
                          label="Nhóm thuốc"
                          name={[field.name, 'drugCategory']}
                          fieldKey={[field.fieldKey, 'drugCategory']}
                          rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                          <Select onChange={props.handleChangeDrugCategory}>
                            {
                              drugCategories.map(cat => (
                                <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                              ))
                            }
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col flex="1 0 220px">
                        <Form.Item
                          {...field}
                          label="Thuốc"
                          name={[field.name, 'drug']}
                          fieldKey={[field.fieldKey, 'drug']}
                          rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                          <Select loading={drugLoading}>
                            {
                              drugs.map(drug => (
                                <Option key={drug.id} value={`${drug.name} ${drug.strength}`}>{drug.name} {drug.strength}</Option>
                              ))
                            }
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col flex="0 0 120px">
                        <Form.Item
                          {...field}
                          name={[field.name, 'drugInstruction']}
                          fieldKey={[field.fieldKey, 'drugInstruction']}
                          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                          label="Cách dùng"
                          style={{ minWidth: 200 }}>
                          <Select>
                            {
                              drugInstructions.map(ins => (
                                <Option key={ins.id} value={ins.instruction}>{ins.instruction}</Option>
                              ))
                            }
                          </Select>
                        </Form.Item>
                      </Col>
                      {/* </Row> */}
                      {/* <Row gutter={15}> */}
                      {/* <Col flex="0 0 80px">
                    <Form.Item
                      {...field}
                      name={[field.name, 'numberOfDays']}
                      fieldKey={[field.fieldKey, 'numberOfDays']}
                      rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                      label="Số ngày">
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Form.Item label="Sáng" name={[field.name, 'morning']}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Form.Item label="Trưa" name={[field.name, 'afternoon']}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Form.Item label="Chiều" name={[field.name, 'evening']}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col flex="0 0 80px">
                    <Form.Item label="Tối" name={[field.name, 'night']}>
                      <Input type="number" />
                    </Form.Item>
                  </Col> */}
                      <Col flex="0 0 80px">
                        <Form.Item
                          {...field}
                          label="Số lượng"
                          name={[field.name, 'total']}
                          fieldKey={[field.fieldKey, 'total']}>
                          <Input type="number" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Col>
                    </Row>
                  ))

                }
                <Form.Item>
                  <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined />}>Thêm thuốc</Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item name="processed" initialValue={emr.medical_record.examination.processed}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>

          <Form.Item label="6. Chẩn đoán khi ra viện" name="diagnose" initialValue={emr.medical_record.examination.diagnose}>
            <DiseaseSelect diseaseCategories={diseaseCategories} diseases={diseases} />
          </Form.Item>

          <Row gutter={15}>
            <Col>
              <Form.Item label="7. Điều trị ngoại trú từ ngày" initialValue={moment(emr.created_at)} name="from_date">
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Đến ngày" name="to_date" initialValue={moment(emr.medical_record.examination.to_date || new Date(), "DD/MM/YYYY")}>
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        </Collapse.Panel>
        <Collapse.Panel header={<strong className="uppercase">tổng kết bệnh án</strong>} key="summary">
          <Form.Item label="1. Quá trình bệnh lý và diễn biến lâm sàng" name="pathological_process_and_clinical_course" initialValue={emr.medical_record.summary.pathological_process_and_clinical_course}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>

          <Form.Item label="2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán" name="valuable_subclinical_summary" initialValue={emr.medical_record.summary.valuable_subclinical_summary}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>

          <Form.Item label="3. Chẩn đoán khi ra viện" className="mb-3">
            <Form.Item name="primary_disease" initialValue={emr.medical_record.summary.primary_disease}>
              <DiseaseSelect label="Bệnh chính" diseaseCategories={diseaseCategories} diseases={diseases} />
            </Form.Item>
            <Form.Item name="sub_disease" initialValue={emr.medical_record.summary.sub_disease}>
              <DiseaseSelect label="Bệnh phụ (nếu có)" diseaseCategories={diseaseCategories} diseases={diseases} clearable />
            </Form.Item>
          </Form.Item>



          <Form.Item label="4. Phương pháp điều trị" name="treatment_method" initialValue={emr.medical_record.summary.treatment_method}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>

          <Form.Item label="5. Tình trạng người bệnh ra viện" name="patient_status" initialValue={emr.medical_record.summary.patient_status}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>

          <Form.Item label="6. Hướng điều trị và các chế độ tiếp theo" name="direction_of_treatment" initialValue={emr.medical_record.summary.direction_of_treatment}>
            <ReactQuill theme="snow" modules={{ toolbar: quillToolbar }} />
          </Form.Item>



          <Row gutter={15} className="mb-5">
            <Col flex="0 0 50%">
              <div className="mb-3">Chỉ định dịch vụ</div>
              <Form.List name="services">
                {
                  (fields, { add, remove }) => (
                    <>
                      {
                        fields.map((field, index) => (
                          <Row gutter={15} key={field.key} align="middle" className="mb-5">
                            <Col>{index + 1}</Col>
                            <Col flex={1}>
                              <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} style={{ margin: 0 }} rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                                <Select placeholder="Chọn dịch vụ">
                                  {
                                    services.map((service, index) => (
                                      <Option value={service.name} key={service.id}>
                                        {service.name}
                                      </Option>
                                    ))
                                  }
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col>
                              <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Col>
                          </Row>
                        ))
                      }
                      <Form.Item>
                        <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined />}>Thêm dịch vụ</Button>
                      </Form.Item>
                    </>
                  )
                }
              </Form.List>
            </Col>
            <Col flex="0 0 50%">
              <div className="mb-3">Tệp đính kèm</div>
              <VisitImagesForm onChange={(e) => props.handleUploadChange(e, emr.id)} fileList={emr.medical_record.summary.attachments || []} />
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>

      <Divider />


      <div className="text-right">
        <Space>
          {/* <Button danger type="default" size="large" icon={<DeleteOutlined />}>Hủy đơn</Button> */}
          <Button type="default" size="large" onClick={props.handleSaveEmr} icon={<SaveOutlined />}>Lưu lại</Button>
          <Button type="primary" size="large" onClick={() => props.handleFinishExamination(emr.id)} loading={finishLoading} icon={<FileDoneOutlined />}>Kết thúc khám</Button>
        </Space>
      </div>
    </Form>
  )
}

export default EMRForm;