import React, { useState, useEffect } from 'react';
import { Tabs, Descriptions, Collapse, PageHeader, message, Divider, Button, Row, Col, Space } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import VisitLivingFunctionForm from 'forms/Visit/VisitLivingFunctionForm';
import VisitDiseaseForm from 'forms/Visit/VisitDiseaseForm';
import VisitServiceForm from 'forms/Visit/VisitServiceForm';
import VisitDrugForm from 'forms/Visit/VisitDrugForm';
import { getDiseaseCategoryAPI } from 'services/user/disease-category.service';
import { getServicesAPI } from 'services/user/medical-service.service';
import { getDrugCategoryAPI } from 'services/user/drug-category.service';
import { getDrugInstructionsAPI } from 'services/user/drug-instruction.service';
import { getDiseaseCategoryAPI as adminGetDiseaseCategoryAPI } from 'services/admin/disease-category.service';
import { getServicesAPI as adminGetServicesAPI } from 'services/admin/medical-service.service';
import { getDrugCategoryAPI as adminGetDrugCategoryAPI } from 'services/admin/drug-category.service';
import { getDrugInstructionsAPI as adminGetDrugInstructionsAPI } from 'services/admin/drug-instruction.service';
import { useHistory } from 'react-router-dom';
import { removeDuplicates } from 'utils/array';
import VisitImagesForm from 'forms/Visit/VisitImagesForm';

const ExaminationPage = props => {

  const user = props.user;
  const history = useHistory();

  const [diseaseCategories, setDiseaseCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [drugCategories, setDrugCategories] = useState([]);
  const [drugInstructions, setDrugInstructions] = useState([]);

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

  async function getInitialData() {
    await Promise.all([
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

    const localListEMRStr = localStorage.getItem("listEMR");
    const localListEMRObj = JSON.parse(localListEMRStr);
    if (localListEMRObj) {
      setListEMR(localListEMRObj);
    }
  }, [user]);

  function handleSaveLivingFunctions(visitId, values) {
    setListEMR(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.livingFunctions = values;
      const newState = [...prevValue, ...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("listEMR", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleSaveDiseases(visitId, values) {
    const visit = listEMR.find(v => v.id === visitId);
    visit.emr_diseases = values.emr_diseases;
    const newState = [...listEMR, ...[visit]];
    const finalList = removeDuplicates(newState, "id");
    localStorage.setItem("listEMR", JSON.stringify(finalList));
    setListEMR(prevValue => {
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleSaveServices(visitId, values) {
    setListEMR(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.emr_services = values.emr_services;
      const newState = [...prevValue, ...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("listEMR", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleSaveDrugs(visitId, values) {
    setListEMR(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.emr_drugs = values.emr_drugs;
      const newState = [...prevValue, ...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("listEMR", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleFinishExamination(visitId) {
    const visit = listEMR.find(v => v.id === visitId);
    console.log(visit);
  }

  function handleUploadChange({ event, file, fileList }, visitId) {
    if (file && file.status === "done") {
      const response = file.response;
      const fileListElement = { uid: response.id, id: response.id, url: response.url };
      const emr = listEMR.find(v => v.id === visitId);
      const newEmr = {...emr};
      newEmr.images.push(fileListElement);
      const newState = [...listEMR, ...[newEmr]]
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("listEMR", JSON.stringify(finalList));
      setListEMR(prev => {
        return finalList;
      });
    } else if (file && file.status === "removed") {
      const emr = listEMR.find(v => v.id === visitId);
      const newEmr = {...emr};
      const imageIndex = newEmr.images.findIndex(img => img.id === file.id);
      newEmr.images.splice(imageIndex, 1);
      const newState = [...listEMR, ...[newEmr]]
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("listEMR", JSON.stringify(finalList));
      setListEMR(prev => {
        return finalList;
      });
    }
  }

  return (
    <>
      <PageHeader title="Khám bệnh" onBack={() => history.goBack()} />
      <Tabs type="card">
        {
          listEMR.map(v => (
            <Tabs.TabPane key={v.id} tab={`${v.patient.first_name} ${v.patient.last_name}`}>
              <Descriptions title="Thông tin bệnh nhân">
                <Descriptions.Item span={1} label="Họ và tên">
                  {v.patient.first_name} {v.patient.last_name} ({v.patient.gender})
                    </Descriptions.Item>
                <Descriptions.Item span={1} label="Ngày sinh">
                  {v.patient.DOB}
                </Descriptions.Item>
              </Descriptions>

              <Descriptions title={`Thông tin khám bệnh (Phòng khám: ${v.room})`}>
                <Descriptions.Item span={1} label="Ngày vào khám">{moment(v.created_at).format("DD/MM/YYYY HH:mm:ss")}</Descriptions.Item>
                <Descriptions.Item span={1} label="Bác sĩ khám bệnh">
                  {v.physician.first_name} {v.physician.last_name}
                </Descriptions.Item>
              </Descriptions>

              <Collapse defaultActiveKey={["living-function", "diseases", "services", "drugs", "images"]}>
                <Collapse.Panel header="Chức năng sống" key="living-function">
                  <VisitLivingFunctionForm
                    onFinish={(values) => handleSaveLivingFunctions(v.id, values)}
                    currentValues={v.livingFunctions} />
                </Collapse.Panel>

                <Collapse.Panel header="Bệnh" key="diseases">
                  <VisitDiseaseForm
                    categories={diseaseCategories}
                    user={user}
                    onFinish={(values) => handleSaveDiseases(v.id, values)}
                    currentValues={v} />
                </Collapse.Panel>
                <Collapse.Panel header="Chỉ định dịch vụ" key="services">
                  <VisitServiceForm
                    user={user}
                    services={services}
                    onFinish={(values) => handleSaveServices(v.id, values)}
                    currentValues={v} />
                </Collapse.Panel>
                <Collapse.Panel header="Kê đơn thuốc" key="drugs">
                  <VisitDrugForm
                    user={user}
                    categories={drugCategories}
                    instructions={drugInstructions}
                    onFinish={(values) => handleSaveDrugs(v.id, values)}
                    currentValues={v} />
                </Collapse.Panel>
                <Collapse.Panel header="Hình ảnh" key="images">
                  <VisitImagesForm
                    emrId="288e8054-fe90-45da-acb1-62c76a8c102c"
                    onChange={(e) => handleUploadChange(e, v.id)}
                    fileList={v.images} />
                </Collapse.Panel>
              </Collapse>

              <Divider />
              <div className="text-right">
                <Space>
                  <Button danger size="large">Hủy đơn</Button>
                  <Button type="primary" size="large" onClick={() => handleFinishExamination(v.id)}>Kết thúc khám</Button>
                </Space>
              </div>
            </Tabs.TabPane>
          ))
        }

      </Tabs>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.userState.user
})

export default connect(mapStateToProps)(ExaminationPage);