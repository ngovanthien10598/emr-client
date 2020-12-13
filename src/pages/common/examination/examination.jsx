import React, { useState, useEffect } from 'react';
import { Tabs, Descriptions, Collapse, PageHeader, message, Divider, Button, Row, Col, Space, Spin } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import VisitLivingFunctionForm from 'forms/Visit/VisitLivingFunctionForm';
import VisitDiseaseForm from 'forms/Visit/VisitDiseaseForm';
import VisitServiceForm from 'forms/Visit/VisitServiceForm';
import VisitDrugForm from 'forms/Visit/VisitDrugForm';
import { useHistory, useParams } from 'react-router-dom';
import { removeDuplicates } from 'utils/array';
import VisitImagesForm from 'forms/Visit/VisitImagesForm';

// APIs
import { getDiseaseCategoryAPI } from 'services/user/disease-category.service';
import { getServicesAPI } from 'services/user/medical-service.service';
import { getDrugCategoryAPI } from 'services/user/drug-category.service';
import { getDrugInstructionsAPI } from 'services/user/drug-instruction.service';
import { getDiseaseCategoryAPI as adminGetDiseaseCategoryAPI } from 'services/admin/disease-category.service';
import { getServicesAPI as adminGetServicesAPI } from 'services/admin/medical-service.service';
import { getDrugCategoryAPI as adminGetDrugCategoryAPI } from 'services/admin/drug-category.service';
import { getDrugInstructionsAPI as adminGetDrugInstructionsAPI } from 'services/admin/drug-instruction.service';
import { getEMRHistoryAPI, updateEMRAPI } from 'services/user/emr.service';

const ExaminationPage = props => {

  const user = props.user;
  const history = useHistory();
  const params = useParams();

  const [diseaseCategories, setDiseaseCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [drugCategories, setDrugCategories] = useState([]);
  const [drugInstructions, setDrugInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emr, setEmr] = useState(null);

  const [livingFncLoading, setLivingFncLoading] = useState(false);
  const [diseaseLoading, setDiseaseLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [drugLoading, setDrugLoading] = useState(false);

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

  async function handleSaveLivingFunctions(emrId, values) {
    try {
      values.bmi = values.bmi.toFixed(2);
      setLivingFncLoading(true);
      const emrToUpdate = { ...emr, living_functions: values };
      const response = await updateEMRAPI(emrId, emrToUpdate);
      setEmr(emrToUpdate);
      message.success({ content: "Lưu thành công" });
    } catch (error) {
      console.log(error);
    } finally {
      setLivingFncLoading(false);
    }
  }

  async function handleSaveDiseases(emrId, values) {
    try {
      setDiseaseLoading(true);
      const emrToUpdate = { ...emr, ...values };
      const response = await updateEMRAPI(emrId, emrToUpdate);
      setEmr(emrToUpdate);
      message.success({ content: "Lưu thành công" });
    } catch (error) {
      console.log(error);
    } finally {
      setDiseaseLoading(false);
    }
  }

  async function handleSaveServices(emrId, values) {
    try {
      setServiceLoading(true);
      const emrToUpdate = { ...emr, ...values };
      const response = await updateEMRAPI(emrId, emrToUpdate);
      setEmr(emrToUpdate);
      message.success({ content: "Lưu thành công" });
    } catch (error) {
      console.log(error);
    } finally {
      setServiceLoading(false);
    }
  }

  async function handleSaveDrugs(emrId, values) {
    try {
      setDrugLoading(true);
      const emrToUpdate = { ...emr, ...values };
      const response = await updateEMRAPI(emrId, emrToUpdate);
      setEmr(emrToUpdate);
      message.success({ content: "Lưu thành công" });
    } catch (error) {
      console.log(error);
    } finally {
      setDrugLoading(false);
    }
  }

  function handleFinishExamination(visitId) {
    const visit = listEMR.find(v => v.id === visitId);
    console.log(visit);
  }

  async function handleUploadChange({ event, file, fileList }, emrId) {

    if (file && file.status === "done") {

      try {
        setDrugLoading(true);

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
      } finally {
        setDrugLoading(false);
      }
    }

    if (file && file.status === "removed") {
      console.log(fileList);
    }
  }

  useEffect(() => {
    console.log(emr);
  }, [emr]);

  return (
    <>
      <PageHeader title="Khám bệnh" onBack={() => history.goBack()} />
      {
        emr ?
          <>
            <Descriptions title="Thông tin bệnh nhân">
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
            </Collapse>

            <Divider />
            <div className="text-right">
              <Space>
                <Button danger size="large">Hủy đơn</Button>
                <Button type="primary" size="large" onClick={() => handleFinishExamination(emr.id)}>Kết thúc khám</Button>
              </Space>
            </div>
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