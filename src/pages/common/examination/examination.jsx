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
  Tabs,
  Alert,
  Modal,
  BackTop
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import VisitImagesForm from 'forms/Visit/VisitImagesForm';
import { FileDoneOutlined, SaveOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import { quillToolbar } from 'constant/quill';

// APIs
import { getServicesAPI } from 'services/user/medical-service.service';
import { getDrugCategoryAPI } from 'services/user/drug-category.service';
import { getDrugInstructionsAPI } from 'services/user/drug-instruction.service';
import { getServicesAPI as adminGetServicesAPI } from 'services/admin/medical-service.service';
import { getDrugCategoryAPI as adminGetDrugCategoryAPI } from 'services/admin/drug-category.service';
import { getDrugInstructionsAPI as adminGetDrugInstructionsAPI } from 'services/admin/drug-instruction.service';
import { getEMRHistoryAPI, updateEMRAPI, completeEMRAPI } from 'services/user/emr.service';
import { deleteVisitAPI } from 'services/user/visit.service';
import { getDrugsAPI as adminGetDrugsAPI } from 'services/admin/drug.service';
import { getDrugsAPI } from 'services/user/drug.service';
import { fetchDiseaseCategory } from 'store/actions/disease-category.action';
import { fetchDisease } from 'store/actions/disease.action';
import DiseaseSelect from 'components/DiseaseSelect/DiseaseSelect';
import EMRForm from 'forms/EMRForm/EMRForm';

const { Option } = Select;
const { useForm } = Form;

const ExaminationPage = props => {

  const {
    user,
    diseaseCategories,
    diseases,
    fetchDiseaseCategory,
    fetchDisease,
  } = props;

  const history = useHistory();
  const params = useParams();

  const [services, setServices] = useState([]);
  const [drugCategories, setDrugCategories] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [drugInstructions, setDrugInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emr, setEmr] = useState(null);

  const [drugLoading, setDrugLoading] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);
  const [isSavingEmr, setIsSavingEmr] = useState(false);

  const [emrForm] = useForm();

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
      if (data[0]) {
        setEmr(data[0]);
      }
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
      getServices(),
      getDrugCategories(),
      getDrugInstructions(),
      fetchDisease(),
      fetchDiseaseCategory()
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

  async function confirmPassword() {
    
  }

  async function handleFinishExamination(visitId) {
    try {
      setFinishLoading(true);
      const completeResponse = await completeEMRAPI(visitId);
      const deleteResponse = await deleteVisitAPI(visitId);
      history.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setFinishLoading(false);
    }
  }

  async function handleSaveEmr() {

    const values = await emrForm.validateFields();

    // return console.log(values);

    const emrBody = {
      patient: emr.patient,
      physician: user,
      room: emr.room,
      medical_record: {
        administrative: {
          fullname: values.fullname || null,
          dayOfBirth: values.dayOfBirth?.format('DD/MM/YYYY') || null,
          gender: values.gender || null,
          job: values.job || null,
          ethnicity: values.ethnicity || null,
          expatriate: values.expatriate || null,
          address: values.address || null,
          workplace: values.workplace || null,
          object: values.object || null,
          insurance_expirity: values.insurance_expirity?.format('DD/MM/YYYY') || null,
          insurance_number: values.insurance_number || null,
          family_member_and_address: values.family_member_and_address || null,
          phone: values.phone || null,
          checkin_at: values.checkin || null,
          previous_diagnose: values.previous_diagnose || null,
          come_from: values.come_from || null
        },
        present_complaint: values.present_complaint || null,
        ask: {
          pathological_process: values.pathological_process || null,
          self_medical_history: values.self_medical_history || null,
          family_medical_history: values.family_medical_history || null
        },
        examination: {
          heartbeat: values.heartbeat || null,
          temperature: values.temperature || null,
          blood_pressure: values.blood_pressure || null,
          breathing: values.breathing || null,
          weight: values.weight || null,
          body: values.body || null,
          partials: values.partials || null,
          subclinical_summary: values.subclinical_summary || null,
          initial_diagnose: {
            category: values.initial_diagnose?.category || null,
            disease: values.initial_diagnose?.disease || null,
          },
          drugs: values.drugs || null,
          processed: values.processed || null,
          diagnose: {
            category: values.diagnose?.category || null,
            disease: values.diagnose?.disease || null
          },
          from_date: values.from_date?.format('DD/MM/YYYY') || null,
          to_date: values.to_date?.format('DD/MM/YYYY') || null,
        },
        summary: {
          pathological_process_and_clinical_course: values.pathological_process_and_clinical_course || null,
          valuable_subclinical_summary: values.valuable_subclinical_summary || null,
          primary_disease: {
            category: values.primary_disease?.category || null,
            disease: values.primary_disease?.disease || null
          },
          sub_disease: {
            category: values.sub_disease?.category || null,
            disease: values.sub_disease?.disease || null
          },
          treatment_method: values.treatment_method || null,
          patient_status: values.patient_status || null,
          direction_of_treatment: values.direction_of_treatment || null,
          services: values.services || null,
          attachments: emr.medical_record.summary.attachments || null
        }
      }
    }
    try {
      setIsSavingEmr(true);
      await updateEMRAPI(emr.id, emrBody);
      message.success("Lưu bệnh án thành công");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSavingEmr(false);
    }


  }

  async function handleUploadChange({ event, file, fileList }, emrId) {
    console.log("change");

    if (file && file.status === "done") {

      try {

        // Upload image
        const response = file.response;
        const fileListElement = { uid: response.url, id: response.url, url: response.url };
        const cloneEmr = { ...emr };
        cloneEmr.medical_record.summary.attachments = [...cloneEmr.medical_record.summary.attachments, ...[fileListElement]];
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
        cloneEmr.medical_record.summary.attachments = fileList;
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



  function getTodayString() {
    const now = new Date();
    return `Ngày ${now.getDate()} tháng ${now.getMonth() + 1}, năm ${now.getFullYear()}`
  }

  return (
    <>
      <PageHeader title="Bệnh án ngoại trú" onBack={() => history.goBack()} />
      {
        emr ?
          emr.completed_at === null ?
            <>
              <Spin spinning={isSavingEmr}>
                <EMRForm
                  emrForm={emrForm}
                  emr={emr}
                  diseases={diseases}
                  diseaseCategories={diseaseCategories}
                  handleChangeDrugCategory={handleChangeDrugCategory}
                  drugCategories={drugCategories}
                  drugLoading={drugLoading}
                  drugInstructions={drugInstructions}
                  services={services}
                  drugs={drugs}
                  handleUploadChange={handleUploadChange}
                  handleSaveEmr={handleSaveEmr}
                  handleFinishExamination={handleFinishExamination}
                  finishLoading={finishLoading} />
              </Spin>
            </>
            :
            <Alert message="Lỗi" description={`Bệnh án này đã đóng vào ${moment(emr.created_at).format("DD/MM/YYYY HH:mm:ss")}`} type="error" showIcon />
          :
          loading ?
            <div className="py-10 text-center"><Spin spinning={loading} /></div>
            :
            <Alert message="Lỗi" description="Không tìm thấy bệnh án" type="error" showIcon />
      }

      <Modal visible={false} title="Xác nhận mật khẩu">
        <Form>
          <Form.Item label="Mật khẩu">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.userState.user,
  diseaseCategories: state.diseaseCategoryState.diseaseCategories,
  fetchDiseaseCategoryLoading: state.diseaseCategoryState.fetchLoading,
  diseases: state.diseaseState.diseases,
  fetchDiseaseLoading: state.diseaseState.fetchLoading
})

const mapDispatchToProps = dispatch => ({
  fetchDiseaseCategory: (role, query) => dispatch(fetchDiseaseCategory(role, query)),
  fetchDisease: (role, query) => dispatch(fetchDisease(role, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationPage);