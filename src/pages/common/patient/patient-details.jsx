import React, { useState, useEffect } from 'react';
import { PageHeader, Descriptions, Spin } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';

// APIs
import { getPatientDetailsAPI } from 'services/user/patient.service';
import { listEMRAPI } from 'services/user/emr.service';

const { Item } = Descriptions;

const PatientDetails = props => {

  const { goBack } = useHistory();
  const { params } = useRouteMatch();
  const patientId = params.patientId;

  const [patient, setPatient] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [EMRs, setEMRs] = useState([]);
  const [EMRLoading, setEMRLoading] = useState(false);

  async function getPatientDetails(patientId) {
    try {
      setPatientLoading(true);
      const patientResponse = await getPatientDetailsAPI(patientId);
      setPatient(patientResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPatientLoading(false);
    }
  }

  async function getPatientEMRs(patientId) {
    try {
      setEMRLoading(true);
      const EMRResponse = await listEMRAPI({ patient_id: patientId });
      console.log(EMRResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setEMRLoading(false);
    }
  }

  async function getInitialData() {
    await Promise.all([
      getPatientDetails(patientId),
      getPatientEMRs(patientId)
    ])
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <>
      <PageHeader onBack={goBack} title={patient ? patient.first_name + " " + patient.last_name : "Chi tiết bệnh nhân"} />

      <Spin spinning={patientLoading}>
        <Descriptions title="Thông tin cá nhân" colon>
          <Item label="Họ và tên">{patient ? patient.first_name + " " + patient.last_name : "Đang tải..."}</Item>
          <Item label="Giới tính">{patient?.gender || "Đang tải"}</Item>
          <Item label="Ngày sinh">{patient?.DOB || "Đang tải"}</Item>
          <Item label="Điện thoại">{patient?.phone || "Đang tải"}</Item>
          <Item label="Địa chỉ">{patient?.address || "Đang cập nhật"}</Item>
        </Descriptions>
      </Spin>

      <div className="ant-descriptions-title">Lịch sử khám bệnh</div>

    </>
  )
}

export default PatientDetails;