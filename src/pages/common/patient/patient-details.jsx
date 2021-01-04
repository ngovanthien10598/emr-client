import React, { useState, useEffect } from 'react';
import { PageHeader, Descriptions, Spin, Table, Space, Button } from 'antd';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

// APIs
import { getPatientDetailsAPI } from 'services/user/patient.service';
import { listEMRAPI } from 'services/user/emr.service';
import Circle from 'components/Circle/Circle';

const { Item } = Descriptions;

const PatientDetails = props => {

  const { goBack } = useHistory();
  const { params, url } = useRouteMatch();
  const patientId = params.patientId;

  const [patient, setPatient] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);
  const [EMRs, setEMRs] = useState(null);
  const [EMRLoading, setEMRLoading] = useState(false);

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Ngày khám bệnh',
      key: 'date',
      render: (_, row) => moment(row.Record.created_at).format("DD/MM/YYYY")
    },
    {
      title: 'Bác sĩ khám bệnh',
      key: 'physician',
      render: (_, row) => row.Record.physician.first_name + " " + row.Record.physician.last_name
    },
    {
      title: 'Phòng khám',
      key: 'room',
      render: (_, row) => row.Record.room.name
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, row) => <div className="flex items-center">
        <Circle color={row.Record.completed_at !== null ? 'success' : ''} />
        <span className="ml-2">{row.Record.completed_at !== null ? ' Đã đóng' : ' Chưa đóng'}</span>
      </div>
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, row) => <Space>
        <Link to={`${url}/${row.Key}`}>
          <Button icon={<EyeOutlined />}>Xem</Button>
        </Link>
        {
          url.includes('/physician') && row.Record.completed_at === null &&
            <Link to={`/physician/visit/${row.Record.id}`}>
              <Button icon={<EditOutlined />}>Cập nhật</Button>
            </Link>
        }
      </Space>
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
      setEMRs(EMRResponse.data.data);
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
      <Table rowKey="Key" dataSource={EMRs} loading={EMRLoading} columns={tableColumns} />

    </>
  )
}

export default PatientDetails;