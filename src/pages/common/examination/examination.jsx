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

const ExaminationPage = props => {

  const user = props.user;
  const history = useHistory();

  const [diseaseCategories, setDiseaseCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [drugCategories, setDrugCategories] = useState([]);
  const [drugInstructions, setDrugInstructions] = useState([]);

  const [visiting, setVisiting] = useState([]);

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

    const localVisitingStr = localStorage.getItem("visiting");
    const localVisitingObj = JSON.parse(localVisitingStr);
    if (localVisitingObj) {
      setVisiting(localVisitingObj);
    }
  }, [user]);

  function handleSaveLivingFunctions(visitId, values) {
    setVisiting(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.livingFunctions = values;
      const newState = [...prevValue, ...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("visiting", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleSaveDiseases(visitId, values) {
    setVisiting(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.emr_diseases = values.emr_diseases;
      const newState = [...prevValue, ...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("visiting", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleSaveServices(visitId, values) {
    setVisiting(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.emr_services = values.emr_services;
      const newState = [...prevValue, ...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("visiting", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleSaveDrugs(visitId, values) {
    setVisiting(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.emr_drugs = values.emr_drugs;
      const newState = [...prevValue, ...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("visiting", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
    })
  }

  function handleFinishExamination(visitId) {
    const visit = visiting.find(v => v.id === visitId);
    console.log(visit);
  }

  return (
    <>
      <PageHeader title="Khám bệnh" onBack={() => history.goBack()} />
      <Tabs type="card">
        {
          visiting.map(v => (
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

              <Collapse defaultActiveKey={["living-function", "diseases", "services", "drugs"]}>
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