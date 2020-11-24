import React, { useState, useEffect } from 'react';
import { Tabs, Descriptions, Collapse, Form, PageHeader, message } from 'antd';
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

const { useForm } = Form;

const ExaminationPage = props => {

  const user = props.user;
  const history = useHistory();

  const [diseaseCategories, setDiseaseCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [drugCategories, setDrugCategories] = useState([]);
  const [drugInstructions, setDrugInstructions] = useState([]);

  const [visiting, setVisiting] = useState([]);

  const [livingFuncsForm] = useForm();
  const [diseasesForm] = useForm();
  const [serviceForm] = useForm();
  const [drugForm] = useForm();

  

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
       const newState = [...prevValue,...[visit]];
       const finalList = removeDuplicates(newState, "id");
       localStorage.setItem("visiting", JSON.stringify(finalList));
       message.success({ content: "Lưu thành công" });
       return finalList;
    })
  }

  function handleSaveDiseases(visitId, values) {
    setVisiting(prevValue => {
      const visit = prevValue.find(v => v.id === visitId);
      visit.emr_diseases = values;
      const newState = [...prevValue,...[visit]];
      const finalList = removeDuplicates(newState, "id");
      localStorage.setItem("visiting", JSON.stringify(finalList));
      message.success({ content: "Lưu thành công" });
      return finalList;
   })
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
                    form={livingFuncsForm}
                    onFinish={(values) => handleSaveLivingFunctions(v.id, values)}
                    currentValues={v.livingFunctions} />
                </Collapse.Panel>

                <Collapse.Panel header="Bệnh" key="diseases">
                  <VisitDiseaseForm
                    form={diseasesForm}
                    categories={diseaseCategories}
                    user={user}
                    onFinish={(values) => handleSaveDiseases(v.id, values)}
                    currentValues={v.emr_diseases} />
                </Collapse.Panel>
                <Collapse.Panel header="Chỉ định dịch vụ" key="services">
                  <VisitServiceForm form={serviceForm} user={user} services={services} />
                </Collapse.Panel>
                <Collapse.Panel header="Kê đơn thuốc" key="drugs">
                  <VisitDrugForm form={drugForm} user={user} categories={drugCategories} instructions={drugInstructions} />
                </Collapse.Panel>
              </Collapse>
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