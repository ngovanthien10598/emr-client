import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { listAllEmrs } from 'services/patient/emr.service';
import moment from 'moment';
import Circle from 'components/Circle/Circle';

const PatientEmrPage = props => {

  const [emrs, setEmrs] = useState(null);
  const [emrLoading, setEmrLoading] = useState(false);

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
      title: 'Khoa khám',
      key: 'room',
      render: (_, row) => "Khoa " + row.Record.room.name
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, row) => <div className="flex items-center">
        <Circle color={row.Record.completed_at !== null ? 'success' : ''} />
        <span className="ml-2">{row.Record.completed_at !== null ? ' Đã đóng' : ' Chưa đóng'}</span>
      </div>
    }
  ]

  async function getEmrs() {
    try {
      setEmrLoading(true);
      const res = await listAllEmrs();
      const data = res.data.data;
      setEmrs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setEmrLoading(false);
    }
  }

  async function getInitialData() {
    return await Promise.all([
      getEmrs()
    ])
  }

  useEffect(() => {
    getInitialData();
  }, [])

  return (
    <>
      <h1 className="text-xl">Lịch sử khám bệnh</h1>
      <Table rowKey="Key" dataSource={emrs} loading={emrLoading} columns={tableColumns} />
    </>
  )
}

export default PatientEmrPage;