import { Empty, PageHeader, Spin, Tabs } from 'antd';
import EmrDesc from 'components/EmrDesc/EmrDesc';
import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getEMRHistoryAPI } from 'services/patient/emr.service';

const PatientEmrDetailsPage = props => {

  const { goBack } = useHistory();
  const { params } = useRouteMatch();

  const [emrHistory, setEmrHistory] = useState([]);
  const [emrLoading, setEmrLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");

  async function getEmrHistory(emrId) {
    try {
      setEmrLoading(true);
      const res = await getEMRHistoryAPI(emrId);
      const data = res.data.data;
      setEmrHistory(data);
      setSelectedTab(data.completed_at || data.updated_at || data.created_at);
    } catch (error) {
      console.log(error);
    } finally {
      setEmrLoading(false);
    }
  }

  async function getInitialData() {
    const emrId = params.emrId;
    return await Promise.all([
      getEmrHistory(emrId)
    ])
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div className="bg-white p-3">
      <PageHeader onBack={goBack} title="Tóm tắt bệnh án" />
      {
        emrLoading ? <Spin spinning={true} /> :
          emrHistory.length > 0 ?
            <Tabs defaultActiveKey={selectedTab} onChange={(val) => setSelectedTab(val)}>
              {
                emrHistory.map(h => {
                  return <Tabs.TabPane key={h.completed_at || h.updated_at || h.created_at} tab={h.completed_at || h.updated_at || h.created_at}>
                    <EmrDesc role="patient" emr={h} />
                  </Tabs.TabPane>
                })
              }
            </Tabs>
            :
            <Empty />
      }
    </div>
  )
}

export default PatientEmrDetailsPage;