import React, { useState, useEffect } from 'react';
import { Row, Col, List, Select, Tabs, Empty } from 'antd';
import VisitItem from 'components/VistItem/VisitItem';
import { getRoomAPI } from 'services/user/room.service';
import { getVisitDataAPI } from 'services/user/visit.service';

const VisitPage = () => {

  const [rooms, setRooms] = useState([]);
  const [visitData, setVisitData] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [visitLoading, setVisitLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const visitList = visitData?.results.filter(visit => {
    const createdAt = new Date(visit.created_at);
    const today = new Date();
    const isToday = createdAt.getDate() === today.getDate() &&
                    createdAt.getMonth() === today.getMonth() &&
                    createdAt.getFullYear() === today.getFullYear();
    return (isToday && visit.room.id === selectedRoom)
  });

  const [tabs, setTabs] = useState([{
    id: 1,
    title: 'Tab 1'
  }]);

  async function getRooms() {
    try {
      setRoomLoading(true);
      const roomResponse = await getRoomAPI();
      setRooms(roomResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRoomLoading(false);
    }
  }

  async function getVisitData() {
    try {
      setVisitLoading(true);
      const visitDataResponse = await getVisitDataAPI();
      const visitData = visitDataResponse.data;
      setVisitData(visitData);
    } catch (error) {

    } finally {
      setVisitLoading(false);
    }
  }

  async function getInitialData() {
    await Promise.all([
      getRooms(),
      getVisitData()
    ]);
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <>
      <h1 className="text-xl">Khám chữa bệnh</h1>

      <Row>
        <Col style={{ width: 300 }}>
          <div className="mb-5">
            <h2 className="text-sm">Phòng trực</h2>
            <Select loading={roomLoading} style={{ width: '100%' }} value={selectedRoom} onChange={setSelectedRoom}>
              {
                rooms.map(room => (
                  <Select.Option key={room.id} value={room.id}>{room.name}</Select.Option>
                ))
              }
            </Select>
          </div>
          <div className="bg-white p-3 pb-0 rounded">
            <h2 className="text-sm mb-0">Bệnh nhân đang chờ khám</h2>
            {
              !selectedRoom ?
                <Empty description="Vui lòng chọn phòng" />
                :
                visitList.length > 0 ?
                  <List split={false} size="small">
                    {
                      visitList.map(visit => (
                        <VisitItem visit={visit} />
                      ))
                    }
                  </List>
                  : <Empty description="Không có dữ liệu" />
            }

          </div>

        </Col>
        <Col className="ml-3">
          <h2 className="text-sm">Khám bệnh</h2>
          <Tabs type="card">
            {
              tabs.map(tab => (
                <Tabs.TabPane key={tab.id} tab={tab.title}></Tabs.TabPane>
              ))
            }

          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default VisitPage;