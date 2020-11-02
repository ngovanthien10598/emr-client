import React, { useState, useEffect } from 'react';
import { Table, Switch } from 'antd';
import { getWorkingHoursAPI, updateWorkingHourAPI } from 'services/admin/working-hours.service';

const WorkingHourPage = () => {

  const [workingHours, setWorkingHours] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableColumns = [
    {
      title: 'Ngày',
      key: 'weekday',
      dataIndex: 'weekday'
    },
    {
      title: 'Đóng cửa',
      key: 'is_closed',
      render: (text, record) => (
        <Switch
          checked={record.is_closed}
          onChange={() => handleWorkingHourChange(record)} />
      )
    }
  ]

  async function getWorkingHours() {
    try {
      setLoading(true);
      const workingHoursResponse = await getWorkingHoursAPI();
      setWorkingHours(workingHoursResponse.data.sort((a, b) => {
        if (a.id < b.id) {
          return -1
        } else {
          return 1
        }
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleWorkingHourChange(wh) {
    try {
      setLoading(true);
      await updateWorkingHourAPI(wh.id, {
        weekday: wh.weekday,
        isClosed: !wh.is_closed
      });
      getWorkingHours();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWorkingHours();
  }, []);

  return (
    <>
      <h1 className="text-xl">Quản lý giờ làm việc</h1>
      <div style={{width: 400}}>
      <Table
        rowKey="weekday"
        dataSource={workingHours}
        columns={tableColumns}
        loading={loading}
        pagination={false} />
      </div>
      
    </>
  )
}

export default WorkingHourPage;