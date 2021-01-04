import React, { useEffect, useState } from 'react';
import { Row, Col, Statistic, Spin, Card, Select, Space } from 'antd';
import { fetchDashboard } from 'store/actions/dashboard.action';
import { connect } from 'react-redux';
import { ProfileOutlined, FileDoneOutlined, FileExcelOutlined } from '@ant-design/icons';
import { ResponsiveBar } from '@nivo/bar';

const AdminDashboard = props => {

  const [result, setResult] = useState({ total: 0, completed: 0, unCompleted: 0 });
  const [resultByYear, setResultByYear] = useState({ total: 0, completed: 0, unCompleted: 0 });
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('Tất cả');
  const [chartData, setChartData] = useState(
    [
      { month: 1, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 2, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 3, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 4, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 5, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 6, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 7, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 8, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 9, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 10, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 11, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 12, "Đã đóng": 0, "Chưa đóng": 0 },
    ]
  );

  const {
    fetchDashboard,
    statistic,
    fetchLoading
  } = props;

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (statistic) {
      let total = 0;
      let completed = 0;
      let unCompleted = 0;
      let years = [];


      // Calc total EMRs
      Object.keys(statistic.emr).map(key => {
        total += statistic.emr[key];

        // Get year
        // const date = moment(key, "M/YYYY");
        const [month, year] = key.split('/');

        if (!years[year]) {
          years.push(year);
        }
      })

      // Calc completed EMRs
      Object.keys(statistic.completed_emr).map(key => {
        completed += statistic.completed_emr[key];
      })

      // Calc uncompleted EMRs
      Object.keys(statistic.uncompleted_emr).map(key => {
        unCompleted += statistic.uncompleted_emr[key];
      })

      setSelectedYear(years[years.length - 1]);
      setResult({ total: total, completed: completed, unCompleted: unCompleted });
      setYears(years);
    }

  }, [statistic]);

  function getChartData() {
    const chartData = [
      { month: 1, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 2, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 3, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 4, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 5, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 6, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 7, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 8, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 9, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 10, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 11, "Đã đóng": 0, "Chưa đóng": 0 },
      { month: 12, "Đã đóng": 0, "Chưa đóng": 0 },
    ]
    let total = 0;
    let completed = 0;
    let unCompleted = 0;

    // Calc EMRs

    // Calc completed EMRs
    Object.keys(statistic.completed_emr).map(key => {

      const [month, year] = key.split('/');

      if (year == selectedYear) {
        chartData[month - 1]["Đã đóng"] = statistic.completed_emr[key];
        completed += statistic.completed_emr[key];
      }
    })

    // Calc uncompleted EMRs
    Object.keys(statistic.uncompleted_emr).map(key => {

      const [month, year] = key.split('/');

      if (year == selectedYear) {
        chartData[month - 1]["Chưa đóng"] = statistic.uncompleted_emr[key];
        unCompleted += statistic.uncompleted_emr[key];
      }
    })

    setChartData(chartData);
    setResultByYear({ total: completed + unCompleted, completed: completed, unCompleted: unCompleted });
  }

  function handleYearChange(year) {
    setSelectedYear(year);
  }

  useEffect(() => {
    if (selectedYear && statistic) {
      getChartData();
    }
  }, [selectedYear])

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <>
      <h1 className="text-xl mb-5">Thống kê</h1>
      <Row gutter={60} className="mb-5">
        <Col flex={1}>
          <Spin spinning={fetchLoading}>
            <Card>
              <Statistic
                title="Tổng số bệnh án"
                value={result.total}
                valueStyle={{ color: '#1890ff' }}
                prefix={<ProfileOutlined />} />
            </Card>
          </Spin>
        </Col>
        <Col flex={1}>
          <Spin spinning={fetchLoading}>
            <Card>
              <Statistic
                title="Bệnh án đã đóng"
                value={result.completed}
                valueStyle={{ color: '#3f8600' }}
                prefix={<FileDoneOutlined />} />
            </Card>
          </Spin>
        </Col>
        <Col flex={1}>
          <Spin spinning={fetchLoading}>
            <Card>
              <Statistic
                title="Bệnh án chưa đóng"
                value={result.unCompleted}
                valueStyle={{ color: '#cf1322' }}
                prefix={<FileExcelOutlined />} />
            </Card>
          </Spin>
        </Col>
      </Row>

      <Row justify="space-between" align='middle' gutter={30}>
        <Col>
          <h2>Bệnh án</h2>
        </Col>
        <Col className="ml-auto">
          <Space size="large">
            <span><strong>Tổng:</strong> {resultByYear.total}</span>
            <span><strong>Đóng:</strong> {resultByYear.completed}</span>
            <span><strong>Chưa đóng:</strong> {resultByYear.unCompleted}</span>
          </Space>
        </Col>
        <Col>
          <Select style={{ width: 100 }} value={selectedYear} onChange={handleYearChange}>
            {
              years.map(y => (
                <Select.Option key={y} value={y}>{y}</Select.Option>
              ))
            }
          </Select>
        </Col>
      </Row>
      <div style={{ height: 400, width: '100%' }}>
        <ResponsiveBar
          data={chartData}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          keys={['Đã đóng', 'Chưa đóng']}
          colors={['#3f8600', '#cf1322']}
          labelTextColor={'#fff'}
          tooltip={(d) => (
            <span>{d.id}: {d.value}</span>
          )}
          indexBy={'month'}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              itemHeight: 24,
              itemWidth: 40,
              translateX: 70
            }
          ]} />
      </div>

    </>
  )
}

const mapStateToProps = state => ({
  statistic: state.dashboardState.statistic,
  fetchLoading: state.dashboardState.fetchLoading
})

const mapDispatchToProps = dispatch => ({
  fetchDashboard: () => dispatch(fetchDashboard())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);