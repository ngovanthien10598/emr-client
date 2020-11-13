import React, { useState, useEffect } from 'react';
import { Row, Col, List, Select, Tabs, Empty, Descriptions, Collapse, Form } from 'antd';
import VisitItem from 'components/VistItem/VisitItem';
import { getRoomAPI } from 'services/user/room.service';
import { getVisitDataAPI } from 'services/user/visit.service';
import moment from 'moment';
import { useSelector } from 'react-redux';
import VisitLivingFunctionForm from 'forms/Visit/VisitLivingFunctionForm';

const { useForm } = Form;

const VisitPage = () => {

  const [rooms, setRooms] = useState([]);
  const [visitData, setVisitData] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [waiting, setWaiting] = useState([]);
  const [visiting, setVisiting] = useState([]);
  const userState = useSelector(state => state.userState);
  const user = userState.user;

  const [livingFuncsForm] = useForm();

  const visitList = visitData?.results.filter(visit => {
    const createdAt = new Date(visit.created_at);
    const today = new Date();
    const isToday = createdAt.getDate() === today.getDate() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear();
    return (isToday && visit.room.id === selectedRoom)
  });

  async function getRooms() {
    try {
      setRoomLoading(true);
      const roomResponse = await getRoomAPI();
      setRooms(roomResponse.data);

      const prevSelected = localStorage.getItem("selectedRoom");
      setSelectedRoom(prevSelected);
    } catch (error) {
      console.log(error);
    } finally {
      setRoomLoading(false);
    }
  }

  async function getVisitData() {
    try {
      const visitDataResponse = await getVisitDataAPI();
      const visitData = visitDataResponse.data;
      setVisitData(visitData);
    } catch (error) {

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

    const localVisitingStr = localStorage.getItem("visiting");
    const localVisitingObj = JSON.parse(localVisitingStr);
    if (localVisitingObj) {
      setVisiting(localVisitingObj);
    }
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      localStorage.setItem("selectedRoom", selectedRoom);
    }
  }, [selectedRoom, visiting])

  function handlePatientClick(visit) {
    setVisiting(prev => {
      const patient = visit.patient;
      const emrObj = {
        id: visit.id,
        patient: {
          id: patient.id,
          first_name: patient.first_name,
          last_name: patient.last_name,
          gender: patient.gender,
          role: patient.role.name,
          avatar: patient.avatar
        },
        physician: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          role: user.role.name,
          avatar: user.avatar
        },
        room: visit.room.name,
        emr_diseases: [],
        emr_services: [],
        emr_drugs: [],
        images: [],
        created_at: visit.created_at,
        symptom: "",

      }
      const newArr = [...prev, ...[emrObj]];
      const unique = removeDuplicates(newArr, "id");
      localStorage.setItem("visiting", JSON.stringify(unique));
      return unique;
    });
  }

  function handleChangeRoom(value) {
    setSelectedRoom(value);
  }

  function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  return (
    <>
      <Row className="flex-no-wrap">
        <Col style={{ width: 350 }} className="flex-shrink-0">
          <div className="mb-5">
            <h2 className="text-sm">Phòng trực</h2>
            <Select loading={roomLoading} style={{ width: '100%' }} value={selectedRoom} onChange={handleChangeRoom}>
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
                visitList?.length > 0 ?
                  <List split={false} size="small">
                    {
                      visitList.map(visit => (
                        <VisitItem
                          key={visit.id}
                          onPatientClick={handlePatientClick}
                          visit={visit} />
                      ))
                    }
                  </List>
                  : <Empty description="Không có dữ liệu" />
            }

          </div>

        </Col>
        <Col className="ml-3 flex-grow-1" style={{ maxWidth: 'calc(100% - 350px - 12px)' }}>
          <h2 className="text-sm">Khám bệnh</h2>
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

                  <Collapse defaultActiveKey={["living-function"]}>
                    <Collapse.Panel header="Chức năng sống" key="living-function">
                      <VisitLivingFunctionForm form={livingFuncsForm} />
                    </Collapse.Panel>
                  </Collapse>
                </Tabs.TabPane>
              ))
            }

          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default VisitPage;