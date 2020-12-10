import React, { useState, useEffect } from 'react';
import { PageHeader, Descriptions, Spin, Table } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

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
  const [EMRs, setEMRs] = useState(null);
  const [EMRLoading, setEMRLoading] = useState(false);

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Ngày khám',
      key: 'created_at',
      render: (text, record) => moment(record.created_at).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Giờ kết thúc',
      key: 'completed_at'
    },
    {
      title: 'Bác sĩ',
      key: 'physician',
      render: (text, { physician }) => physician.first_name + " " + physician.last_name
    },
    {
      title: 'Chẩn đoán',
      key: 'diagnose',
      render: (text, { emr_diseases }) => emr_diseases.map(disease => disease.name).join(", ")
    }
  ]

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
      setEMRs(EMRResponse.data);
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
          <Item label="Ngày sinh">{patient ? moment(patient.DOB).format("DD/MM/YYYY") : "Đang tải"}</Item>
          <Item label="Điện thoại">{patient?.phone || "Đang tải"}</Item>
          <Item label="Địa chỉ">{patient?.address || "Đang cập nhật"}</Item>
        </Descriptions>
      </Spin>

      <div className="ant-descriptions-title mb-3">Lịch sử khám bệnh</div>
      <Table rowKey="id" dataSource={EMRs?.results} loading={EMRLoading} columns={tableColumns} />

    </>
  )
}

export default PatientDetails;