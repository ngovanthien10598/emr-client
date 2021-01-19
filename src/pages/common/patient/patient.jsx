import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Table, Space, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

// API
import { listAllPatientsAPI } from 'services/user/patient.service';
import NullPlaceholder from 'components/NullPlaceholder/NullPlaceholder';

const PatientPage = props => {
  const { path } = useRouteMatch();

  const [patientData, setPatientData] = useState(null);
  const [patientLoading, setPatientLoading] = useState(false);

  const tableColumns = [
    {
      title: '#',
      key: '#',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Họ và tên',
      key: 'fullname',
      render: (text, record) => record.first_name + " " + record.last_name
    },
    {
      title: 'Giới tính',
      key: 'gender',
      dataIndex: 'gender'
    },
    {
      title: 'Ngày sinh',
      key: 'DOB',
      render: (text, record) => moment(record.DOB).format('DD/MM/YYYY')
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      render: (text, record) => record.address || NullPlaceholder
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Link to={`${path}/${record.id}`}>
            <Button icon={<EyeOutlined />}>Xem chi tiết</Button>
          </Link>
        </Space>
      )
    }
  ]

  async function listAllPatient() {
    try {
      setPatientLoading(true);
      const patientResults = await listAllPatientsAPI();
      const patientData = patientResults.data;
      setPatientData(patientData);
    } catch (error) {

    } finally {
      setPatientLoading(false);
    }
  }

  async function getInitialData() {
    await Promise.all([
      listAllPatient()
    ])
  }

  useEffect(() => {
    getInitialData()
  }, []);

  return (
    <>
      <PageHeader title="Bệnh nhân" />
      <Table columns={tableColumns} dataSource={patientData?.results} loading={patientLoading} rowKey="id" />
    </>
  )
}

function mapStateToProps(state) {
  return {
    user: state.userState.user
  }
}

export default connect(mapStateToProps)(PatientPage); 