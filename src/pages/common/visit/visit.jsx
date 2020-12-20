import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Empty, Table, Button } from 'antd';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { removeDuplicates } from 'utils/array';
import moment from 'moment';

// APIs
import { getRoomAPI } from 'services/user/room.service';
import { getRoomAPI as adminGetRoomAPI } from 'services/admin/room.service';
import { getVisitDataAPI } from 'services/user/visit.service';
import { getVisitDataAPI as adminGetVisitDataAPI } from 'services/admin/visit.service';
import { addEMRAPI, getEMRHistoryAPI } from 'services/user/emr.service';


const VisitPage = props => {
  const user = props.user;
  const { pathname } = useLocation();

  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [roomLoading, setRoomLoading] = useState(false);
  const [visitData, setVisitData] = useState(null);
  const [visitLoading, setVisitLoading] = useState(false);
  const [createEMRLoading, setCreateEMRLoading] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState("");

  const visitList = visitData?.results.filter(visit => {
    const createdAt = new Date(visit.created_at);
    const today = new Date();
    const isToday = createdAt.getDate() === today.getDate() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear();
    return (isToday && visit.room.id === selectedRoom)
  });

  const tableColumns = [
    {
      title: 'Số thứ tự',
      key: '#',
      dataIndex: 'visit_number'
    },
    {
      title: 'Họ và tên',
      key: 'fullname',
      render: (_, record) => record.patient.first_name + " " + record.patient.last_name
    },
    {
      title: 'Giới tính',
      key: 'gender',
      render: (_, record) => record.patient.gender
    },
    {
      title: 'Ngày sinh',
      key: 'DOB',
      render: (_, record) => moment(record.patient.DOB).format('DD/MM/YYYY')
    },
    {
      ken: 'action',
      render: (_, record) => <Button onClick={() => handlePatientClick(record)} loading={createEMRLoading.includes(record.id)}>Khám bệnh</Button>
    }
  ]

  async function getRooms() {
    try {
      setRoomLoading(true);
      let roomResponse;
      if (user.role.name === "admin") {
        roomResponse = await adminGetRoomAPI();
      } else if (user.role.name === "physician" || user?.role?.name === "receptionist") {
        roomResponse = await getRoomAPI();
      }
      setRooms(roomResponse.data);

      const prevSelected = localStorage.getItem("selectedRoom");
      if (prevSelected) {
        setSelectedRoom(prevSelected);
        getVisitData(prevSelected);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setRoomLoading(false);
    }
  }

  async function getVisitData(roomId) {
    try {
      let visitDataResponse;
      setVisitLoading(true);
      if (user.role.name === "admin") {
        visitDataResponse = await adminGetVisitDataAPI({ room_id: roomId });
      } else {
        visitDataResponse = await getVisitDataAPI({ room_id: roomId })
      }
      const visitData = visitDataResponse.data;
      setVisitData(visitData);
    } catch (error) {
      console.log(error);
    } finally {
      setVisitLoading(false);
    }
  }

  async function getInitialData() {
    await Promise.all([
      getRooms(),
    ]);
  }

  useEffect(() => {
    if (user) {
      getInitialData();
    }
  }, [user]);

  useEffect(() => {
    if (selectedRoom) {
      localStorage.setItem("selectedRoom", selectedRoom);
    }
  }, [selectedRoom])

  async function createEmr(emr) {
    try {
      setCreateEMRLoading(prev => [...prev, ...[emr.visit_id]]);
      const response = await addEMRAPI(emr);
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    } finally {
      setCreateEMRLoading(prev => {
        const cloneArr = [...prev];
        cloneArr.splice(cloneArr.indexOf(emr.visit_id), 1);
        return cloneArr
      });
    }
  }

  async function checkExistEMR(emrId) {
    try {
      setCreateEMRLoading(prev => [...prev, ...[emrId]]);
      const historyResponse = await getEMRHistoryAPI(emrId);
      const data = historyResponse.data.data;
      const existEmr = data.find(emr => emr.id === emrId && emr.completed_at === null);
      return !!(existEmr);
    } catch (error) {

    } finally {
      setCreateEMRLoading(prev => {
        const cloneArr = [...prev];
        cloneArr.splice(cloneArr.indexOf(emrId), 1);
        return cloneArr
      });
    }
  }

  async function handlePatientClick(visit) {
    const { patient } = visit;
    const existVisit = await checkExistEMR(visit.id);

    if (!existVisit) {

      const emrObj = {
        visit_id: visit.id,
        patient: {
          id: patient.id,
          first_name: patient.first_name,
          last_name: patient.last_name,
          gender: patient.gender,
          role: patient.role.name,
          avatar: patient.avatar,
          DOB: patient.DOB
        },
        physician: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          role: user.role.name,
          avatar: user.avatar
        },
        room: "",
        living_functions: null,
        emr_diseases: [],
        emr_services: [],
        emr_drugs: [],
        images: []
      }

      try {
        await createEmr(emrObj);
        history.push(`${pathname}/${visit.id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push(`${pathname}/${visit.id}`);
    }
  }

  function handleChangeRoom(value) {
    setSelectedRoom(value);
    getVisitData(value);
  }

  return (
    <>
      <Row className="flex-no-wrap">
        <Col style={{ width: 350 }} className="flex-shrink-0">
          <div className="mb-5">
            <h3 className="text-xl">Khoa</h3>
            <Select loading={roomLoading} style={{ width: '100%' }} value={selectedRoom} onChange={handleChangeRoom}>
              {
                rooms.map(room => (
                  <Select.Option key={room.id} value={room.id} onChange={handleChangeRoom}>{room.name}</Select.Option>
                ))
              }
            </Select>
          </div>
        </Col>
        <Col flex="0 0 45px"></Col>
        <Col flex={1}>
          <h3 className="text-xl">Bệnh nhân đang chờ khám</h3>
          <Table dataSource={visitList} columns={tableColumns} rowKey="id" loading={visitLoading} pagination={false} />
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.userState.user
})

export default connect(mapStateToProps)(VisitPage);