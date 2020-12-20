import React, { useState, useEffect } from 'react';
import {
  Collapse,
  PageHeader,
  message,
  Divider,
  Button,
  Row,
  Col,
  Space,
  Spin,
  Form,
  Input,
  DatePicker,
  Select,
  Radio,
  Tabs
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import VisitDiseaseForm from 'forms/Visit/VisitDiseaseForm';
import VisitServiceForm from 'forms/Visit/VisitServiceForm';
import VisitDrugForm from 'forms/Visit/VisitDrugForm';
import { useHistory, useParams } from 'react-router-dom';
import { removeDuplicates } from 'utils/array';
import VisitImagesForm from 'forms/Visit/VisitImagesForm';
import { FileDoneOutlined, SaveOutlined, DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// APIs
import { getDiseaseCategoryAPI } from 'services/user/disease-category.service';
import { getServicesAPI } from 'services/user/medical-service.service';
import { getDrugCategoryAPI } from 'services/user/drug-category.service';
import { getDrugInstructionsAPI } from 'services/user/drug-instruction.service';
import { getDiseaseCategoryAPI as adminGetDiseaseCategoryAPI } from 'services/admin/disease-category.service';
import { getServicesAPI as adminGetServicesAPI } from 'services/admin/medical-service.service';
import { getDrugCategoryAPI as adminGetDrugCategoryAPI } from 'services/admin/drug-category.service';
import { getDrugInstructionsAPI as adminGetDrugInstructionsAPI } from 'services/admin/drug-instruction.service';
import { getEMRHistoryAPI, updateEMRAPI, completeEMRAPI } from 'services/user/emr.service';
import { deleteVisitAPI } from 'services/user/visit.service';
import { getDrugsAPI as adminGetDrugsAPI } from 'services/admin/drug.service';
import { getDrugsAPI } from 'services/user/drug.service';

const { Option } = Select;

const ExaminationPage = props => {

  const user = props.user;
  const history = useHistory();
  const params = useParams();

  const [diseaseCategories, setDiseaseCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [drugCategories, setDrugCategories] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [drugInstructions, setDrugInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emr, setEmr] = useState(null);

  const [livingFncLoading, setLivingFncLoading] = useState(false);
  const [diseaseLoading, setDiseaseLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [drugLoading, setDrugLoading] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);

  const [listEMR, setListEMR] = useState([]);

  async function getDiseaseCategories() {
    try {
      let diseaseCategoryResponse;
      if (user.role.name === "admin") {
        diseaseCategoryResponse = await adminGetDiseaseCategoryAPI();
      } else {
        diseaseCategoryResponse = await getDiseaseCategoryAPI()
      }
      const diseaseCategoriesData = diseaseCategoryResponse.data;
      setDiseaseCategories(diseaseCategoriesData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getServices() {
    try {
      let servicesResponse;
      if (user.role.name === "admin") {
        servicesResponse = await adminGetServicesAPI();
      } else {
        servicesResponse = await getServicesAPI()
      }
      const servicesData = servicesResponse.data;
      setServices(servicesData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDrugCategories() {
    try {
      let drugCategoryResponse;
      if (user.role.name === "admin") {
        drugCategoryResponse = await adminGetDrugCategoryAPI();
      } else {
        drugCategoryResponse = await getDrugCategoryAPI()
      }
      const drugCategoriesData = drugCategoryResponse.data;
      setDrugCategories(drugCategoriesData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDrugs(drugCategory) {
    try {
      setDrugLoading(true);
      let drugResponse;
      if (user.role.name === "admin") {
        drugResponse = await adminGetDrugsAPI({ drug_category: drugCategory });
      } else {
        drugResponse = await getDrugsAPI({ drug_category: drugCategory })
      }
      const drugData = drugResponse.data;
      setDrugs(drugData);
    } catch (error) {
      console.log(error);
    } finally {
      setDrugLoading(false);
    }
  }

  async function getDrugInstructions() {
    try {
      let drugInsResponse;
      if (user.role.name === "admin") {
        drugInsResponse = await adminGetDrugInstructionsAPI();
      } else {
        drugInsResponse = await getDrugInstructionsAPI()
      }
      const drugInsData = drugInsResponse.data;
      setDrugInstructions(drugInsData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmrDetail(emrId) {
    try {
      setLoading(true);
      const emrList = await getEMRHistoryAPI(emrId);
      const data = emrList.data.data;
      const emr = data.find(emr => emr.id === emrId && emr.completed_at === null);
      setEmr(emr);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getInitialData() {
    const emr = params.emr;
    await Promise.all([
      getEmrDetail(emr),
      getDiseaseCategories(),
      getServices(),
      getDrugCategories(),
      getDrugInstructions()
    ]);
  }

  useEffect(() => {
    if (user) {
      getInitialData();
    }
  }, [user]);

  async function handleChangeDrugCategory(category) {
    await getDrugs(category);
  }

  async function handleFinishExamination(visitId) {
    // try {
    //   setFinishLoading(true);
    //   const completeResponse = await completeEMRAPI(visitId);
    //   const deleteResponse = await deleteVisitAPI(visitId);
    //   history.goBack();
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setFinishLoading(false);
    // }
  }

  async function handleSaveEmr(values) {

    const emrBody = {
      id: emr.id,
      patient: emr.patient,
      physician: user,
      medical_record: {
        administrative: {
          fullname: values.fullname,
          dayOfBirth: values.dayOfBirth.format('DD/MM/YYYY'),
          gender: values.gender,
          job: values.job,
          ethnicity: values.ethnicity,
          expatriate: values.expatriate,
          address: values.address,
          workplace: values.workplace,
          object: values.object,
          insurance_expirity: values.insurance_expirity.format('DD/MM/YYYY'),
          insurance_number: values.insurance_number,
          family_member_and_address: values.family_member_and_address,
          phone: values.phone,
          checkin_at: values.checkin,
          previous_diagnose: values.previous_diagnose,
          come_from: values.come_from
        },
        present_complaint: values.present_complaint,
        ask: {
          pathological_process: values.pathological_process,
          self_medical_history: values.self_medical_history,
          family_medical_history: values.family_medical_history
        },
        examination: {
          heartbeat: values.heartbeat,
          temperature: values.temperature,
          blood_pressure: values.blood_pressure,
          breathing: values.breathing,
          weight: values.weight,
          body: values.body,
          partials: values.partials,
          subclinical_summary: values.subclinical_summary,
          initial_diagnose: values.initial_diagnose,
          drugs: values.drugs,
          processed: values.processed,
          diagnose: values.diagnose,
          from_date: values.from_date.format('DD/MM/YYYY'),
          to_date: values.to_date.format('DD/MM/YYYY'),
        },
        summary: {
          pathological_process_and_clinical_course: values.pathological_process_and_clinical_course,
          valuable_subclinical_summary: values.valuable_subclinical_summary,
          primary_disease: values.primary_disease,
          sub_disease: values.sub_disease,
          treatment_method: values.treatment_method,
          patient_status: values.patient_status,
          direction_of_treatment: values.direction_of_treatment,

          services: values.services,
          attachments: emr.images
        }
      }
    }

    console.log(emrBody);
  }

  async function handleUploadChange({ event, file, fileList }, emrId) {

    if (file && file.status === "done") {

      try {

        // Upload image
        const response = file.response;
        const fileListElement = { uid: response.url, id: response.url, url: response.url };
        const cloneEmr = { ...emr };
        cloneEmr.images = [...cloneEmr.images, ...[fileListElement]];
        const updateRes = await updateEMRAPI(emrId, cloneEmr);
        setEmr(cloneEmr);
        message.success({ content: "Lưu thành công" });
      } catch (error) {
        console.log(error);
      }
    }

    if (file && file.status === "removed") {
      try {
        const cloneEmr = { ...emr };
        cloneEmr.images = fileList;
        const updateRes = await updateEMRAPI(emrId, cloneEmr);
        setEmr(cloneEmr);
        message.success({ content: "Lưu thành công" });
      } catch (error) {
        console.log(error);
      }
    }
  }

  // useEffect(() => {
  //   console.log(emr);
  // }, [emr]);

  function getDateString(dateStr) {
    let result = "";
    const momentObj = moment(dateStr);
    result = `${momentObj.hour()} giờ ${momentObj.minute()} phút ngày ${momentObj.date()} tháng ${momentObj.month()} năm ${momentObj.year()}`;
    return result;
  }

  function getTodayString() {
    const now = new Date();
    return `Ngày ${now.getDate()} tháng ${now.getMonth() + 1}, năm ${now.getFullYear()}`
  }

  return (
    <>
      <PageHeader title="Bệnh án ngoại trú" onBack={() => history.goBack()} />
      {
        emr ?
          <>
            <Form layout="vertical" onFinish={handleSaveEmr}>

              {/* <Descriptions title="Thông tin bệnh nhân">
              <Descriptions.Item span={1} label="Họ và tên">
                {emr.patient.first_name} {emr.patient.last_name} ({emr.patient.gender})
                    </Descriptions.Item>
              <Descriptions.Item span={1} label="Ngày sinh">
                {emr.patient.DOB}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title={`Thông tin khám bệnh (Phòng khám: ${emr.room})`}>
              <Descriptions.Item span={1} label="Ngày vào khám">{moment(emr.created_at).format("DD/MM/YYYY HH:mm:ss")}</Descriptions.Item>
              <Descriptions.Item span={1} label="Bác sĩ khám bệnh">
                {emr.physician.first_name} {emr.physician.last_name}
              </Descriptions.Item>
            </Descriptions>

            <Collapse defaultActiveKey={["living-function", "diseases", "services", "drugs", "images"]}>
              <Collapse.Panel header="Dấu hiệu sinh tồn" key="living-function">
                <VisitLivingFunctionForm
                  onFinish={(values) => handleSaveLivingFunctions(emr.id, values)}
                  loading={livingFncLoading}
                  currentValues={emr.living_functions} />
              </Collapse.Panel>

              <Collapse.Panel header="Bệnh" key="diseases">
                <VisitDiseaseForm
                  categories={diseaseCategories}
                  user={user}
                  loading={diseaseLoading}
                  onFinish={(values) => handleSaveDiseases(emr.id, values)}
                  currentValues={emr} />
              </Collapse.Panel>
              <Collapse.Panel header="Chỉ định dịch vụ" key="services">
                <VisitServiceForm
                  user={user}
                  loading={serviceLoading}
                  services={services}
                  onFinish={(values) => handleSaveServices(emr.id, values)}
                  currentValues={emr} />
              </Collapse.Panel>
              <Collapse.Panel header="Kê đơn thuốc" key="drugs">
                <VisitDrugForm
                  user={user}
                  categories={drugCategories}
                  loading={drugLoading}
                  instructions={drugInstructions}
                  onFinish={(values) => handleSaveDrugs(emr.id, values)}
                  currentValues={emr} />
              </Collapse.Panel>
              <Collapse.Panel header="Hình ảnh" key="images">
                <VisitImagesForm
                  emrId="288e8054-fe90-45da-acb1-62c76a8c102c"
                  onChange={(e) => handleUploadChange(e, emr.id)}
                  fileList={emr.images} />
              </Collapse.Panel>
            </Collapse> */}

              <Row gutter={15}>
                <Col flex={1}>
                  <Form.Item label="Sở y tế" name="health_service_dept">
                    <Input />
                  </Form.Item>
                </Col>
                <Col flex={1}>
                  <Form.Item label="Bệnh viện" name="hospital">
                    <Input />
                  </Form.Item>
                </Col>
                <Col flex={1}>
                  <Form.Item label="Khoa" name="room" initialValue={emr.room}>
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
                      <Form.Item label="9. Đối tượng" name="object">
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
                        <DatePicker style={{ width: '100%' }} />
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
                      <Form.Item label="13. Chẩn đoán của nơi giới thiệu" name="previous_diagnose">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item label="Nơi giới thiệu" name="come_from">
                        <Radio.Group>
                          <Radio value="Y tế">1. Y tế</Radio>
                          <Radio value="Tự đến">2. Tự đến</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>

                </Collapse.Panel>
                <Collapse.Panel header={<strong className="uppercase">II. Lý do vào viện</strong>} key="present-complaint">
                  <Form.Item label="Lý do vào viện" name="present_complaint">
                    <Input />
                  </Form.Item>
                </Collapse.Panel>
                <Collapse.Panel header={<strong className="uppercase">iii. hỏi bệnh</strong>} key="ask">
                  <Form.Item label="1. Quá trình bệnh lý" name="pathological_process">
                    <Input.TextArea rows={3} autoSize={true} />
                  </Form.Item>
                  <Form.Item label="2. Tiền sử bệnh" name="self_medical_history" className="mb-3">
                    <Input placeholder="Bản thân" />
                  </Form.Item>
                  <Form.Item name="family_medical_history">
                    <Input placeholder="Gia đình" />
                  </Form.Item>
                </Collapse.Panel>
                <Collapse.Panel header={<strong className="uppercase">iv. khám bệnh</strong>} key="examination">
                  <Row gutter={15}>
                    <Col flex={1}>
                      <Form.Item label="1. Toàn thân" name="body">
                        <Input.TextArea rows={7} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <div className="border border-solid border-gray-400 p-2">
                        <Form.Item className="mb-2" name="heartbeat">
                          <Input addonBefore={<div style={{ width: 80 }}>Mạch</div>} suffix="lần/ph" />
                        </Form.Item>
                        <Form.Item className="mb-2" name="temperature">
                          <Input addonBefore={<div style={{ width: 80 }}>Nhiệt độ</div>} suffix="°C" />
                        </Form.Item>
                        <Form.Item className="mb-2" name="blood_pressure">
                          <Input addonBefore={<div style={{ width: 80 }}>Huyết áp</div>} suffix="mmHg" />
                        </Form.Item>
                        <Form.Item className="mb-2" name="breathing">
                          <Input addonBefore={<div style={{ width: 80 }}>Nhịp thở</div>} suffix="lần/ph" />
                        </Form.Item>
                        <Form.Item className="mb-0" name="weight">
                          <Input addonBefore={<div style={{ width: 80 }}>Câng nặng</div>} suffix="kg" />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>

                  <Form.Item label="2. Các bộ phận" name="partials">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item label="3. Tóm tắt kết quả cận lâm sàng" name="subclinical_summary">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item label="4. Chẩn đoán ban đầu" name="initial_diagnose">
                    <Input />
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
                                  <Select onChange={handleChangeDrugCategory}>
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
                                        <Option key={drug.id} value={drug.name}>{drug.name} {drug.strength}</Option>
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

                  <Form.Item name="processed">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item label="6. Chẩn đoán khi ra viện" name="diagnose">
                    <Input />
                  </Form.Item>

                  <Row gutter={15}>
                    <Col>
                      <Form.Item label="7. Điều trị ngoại trú từ ngày" initialValue={moment(emr.created_at)} name="from_date">
                        <DatePicker format="DD/MM/YYYY" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item label="Đến ngày" name="to_date">
                        <DatePicker format="DD/MM/YYYY" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Collapse.Panel>
                <Collapse.Panel header={<strong className="uppercase">tổng kết bệnh án</strong>} key="summary">
                  <Form.Item label="1. Quá trình bệnh lý và diễn biến lâm sàng" name="pathological_process_and_clinical_course">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item label="2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán" name="valuable_subclinical_summary">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item label="3. Chuẩn đoán ra viện" className="mb-3" name="primary_disease">
                    <Input addonBefore="Bệnh chính" />
                  </Form.Item>
                  <Form.Item name="sub_disease">
                    <Input addonBefore="Bệnh phụ (nếu có)" />
                  </Form.Item>

                  <Form.Item label="4. Phương pháp điều trị" className="treatment_method">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item label="5. Tình trạng người bệnh ra viện" className="patient_status">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item label="6. Hướng điều trị và các chế độ tiếp theo" className="direction_of_treatment">
                    <Input.TextArea rows={6} />
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
                                      <Form.Item {...field} name={[field.name, 'id']} fieldKey={[field.fieldKey, 'id']} style={{ margin: 0 }} rules={[{ required: true, message: "Trường này là bắt buộc" }]}>
                                        <Select placeholder="Chọn dịch vụ">
                                          {
                                            services.map((service, index) => (
                                              <Option value={service.id} key={service.id}>
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
                      <VisitImagesForm onChange={(e) => handleUploadChange(e, emr.id)} fileList={emr.images || []} />
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>

              <Divider />


              <div className="text-right">
                <Space>
                  <Button danger type="default" size="large" icon={<DeleteOutlined />}>Hủy đơn</Button>
                  <Button htmlType="submit" type="default" size="large" icon={<SaveOutlined />}>Lưu lại</Button>
                  <Button type="primary" size="large" onClick={() => handleFinishExamination(emr.id)} loading={finishLoading} icon={<FileDoneOutlined />}>Kết thúc khám</Button>
                </Space>
              </div>
            </Form>
          </>

          :
          <div className="py-10 text-center"><Spin spinning={loading} /></div>
      }
    </>
  )
}

const mapStateToProps = state => ({
  user: state.userState.user
})

export default connect(mapStateToProps)(ExaminationPage);