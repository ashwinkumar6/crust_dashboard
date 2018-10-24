import React, { Component } from "react";
import { Tabs, Row, Col, Card, Skeleton } from "antd";
import DropdownOptions from "./SubComponents/DropDownRender";
import Charts from "./Charts";
import LineChart from "./LineChart";
import PieCharts from "../components/PieCharts";
import Tables from "../components/Tables";
import AreaChart from "../components/AreaChart";
import MultiDropDown from "./MultiDropDown"
import Action from '../redux/ActionType';

const TabPane = Tabs.TabPane;

export class RenderBarChart extends Component {
  render() {
    const { data, loading, protocolFilter } = this.props;
    console.log('Bar', data);
    const chartData = []
    protocolFilter.tcpHp ? chartData.push({ x: "TCP HP", y: data.tcp }) : null;
    protocolFilter.udpHp ? chartData.push({ x: "UDP HP", y: data.udp }) : null;
    protocolFilter.direct ? chartData.push({ x: "Direct", y: data.direct }) : null;
    return (
      <div>
        <Card
          style={{
            background: "#fff",
            borderRadius: 3,
            minHeight: 500
          }}
          title="Protocol Success"
        >
          <Skeleton loading={loading} paragraph={{ rows: 15 }} active animate>
            <Charts dataSource={chartData} interval={Math.round((data.tcp + data.udp + data.direct) / 3)} />
          </Skeleton>
        </Card>
      </div>
    )
  }
}

export class RenderPieChart extends Component {
  render() {
    const { data, loading, protocolFilter } = this.props;
    data.success = 70;
    data.failed = 30;

    let success = 0;
    if (protocolFilter.tcpHp && protocolFilter.udpHp && protocolFilter.direct) {
      success = data.totalLogs - data.failed;
    }
    else {
      success += (protocolFilter.tcpHp ? data.success.tcpHpCount : 0);
      success += (protocolFilter.udpHp ? data.success.udpHpCount : 0);
      success += (protocolFilter.direct ? data.success.directCount : 0);
    }
    const chartData = [
      {
        type: "Successful\t\t" + data.success,
        value: data.success,
      },
      {
        type: "Failed\t\t" + data.failed,
        value: data.failed,
      }
    ];
    const percent = Math.round(data.success / (data.success + data.failed) * 100)
    return (
      <div>
        <Card
          style={{
            background: "#fff",
            borderRadius: 3,
            minHeight: 500
          }}
          title="Connections"
        >
          <Skeleton loading={loading} paragraph={{ rows: 15 }} active animate>
            <div className="chart-1-meta">
              <div className="chart-1-meta-val">{success + data.failed}</div>
              <div className="chart-1-meta-desc">Total Successful Connections</div>
            </div>
            <PieCharts data={chartData} percent={percent} title="Success Rate" />
          </Skeleton>
        </Card>
      </div>
    )
  }
}

export class RenderLineChart extends Component {
  render() {
    const { data } = this.props;
    return (
      <Row gutter={24} style={{ margin: "24px 8px" }}>
        <Col className="gutter-row" span={24}>
          <Card
            style={{
              borderRadius: 3,
              minHeight: 500
            }}>
            <LineChart data={data} height={400} titleMap={{ y1: 'Total', y2: 'Successful', y3: 'Failed' }} />
          </Card>
        </Col>
      </Row>
    )
  }
}

export class RenderTable extends Component {
  render() {
    const { tableData, loading, tabData } = this.props;
    return (
      <Row gutter={24}>
        <Col className="gutter-row" span={24}>
          <Card
            bordered={false}
            style={{
              background: "#fff",
              borderRadius: 5,
              minHeight: 100
            }}
            className="cus-card-1 table-1 tab-1-base"
            title="All Connection Attempts"
          >
            {/* <div className="table-1-opt">
            <Button type="primary" icon="download" size="large">Download CSV</Button>
          </div> */}
            <Skeleton loading={loading} paragraph={{ rows: 15 }} active animate>
              <Tables dataSource={tableData} dropDownFilter={tabData.selectedLabel} />
            </Skeleton>
          </Card>
        </Col>
      </Row>
    )
  }
}

export class RenderAreaChart extends Component {
  render() {
    const { chartData, filteredLogs, loading } = this.props;
    return (
      <Row gutter={24}>
        <Col className="gutter-row" span={24}>
          <Card
            bordered={false}
            style={{
              background: "#fff",
              borderRadius: 5,
              minHeight: 100
            }}
            className="cus-card-1 chart-1 tab-1-base"
            title="Connection Success Rate"
          >
            <Skeleton loading={loading} paragraph={{ rows: 15 }} active animate>
              <div className="x-axis-label">Cumulative Attempts</div>
              {
                this.props.showFailedCount ? (
                  <div className="chart-1-meta">
                    <div className="chart-1-meta-val">{filteredLogs.length - chartData.failed}</div>
                    <div className="chart-1-meta-desc">Successful Connections</div>
                    <div className="chart-1-meta-val">{chartData.failed}</div>
                    <div className="chart-1-meta-desc">Failed Connections</div>
                  </div>
                ) : (
                    <div className="chart-1-meta">
                      <div className="chart-1-meta-val">{filteredLogs.length - chartData.failed}</div>
                      <div className="chart-1-meta-desc">Successful Connections</div>
                    </div>
                  )
              }
              <div className="chat-2"><AreaChart data={chartData.data} /></div>
            </Skeleton>
          </Card>
        </Col>
      </Row>
    )
  }
}
export class RenderMultiDropDown extends Component {
  render() {
    const { data, mod, filterAction } = this.props;
    return (
      <Row gutter={24}>
        <Col className="gutter-row" span={24}>
          <Card
            bordered={false}
            style={{
              background: "#fff",
              borderRadius: 5,
              minHeight: 150
            }}
            title="Filter By User"
          >
            <Row gutter={24} className="filters-2" type="flex">
              <MultiDropDown type="Include" items={data} mod={mod} filterAction={filterAction} actionType={Action.FILTER_INCLUDE_PEER_ID} />
              <MultiDropDown type="Exclude" items={data} mod={mod} filterAction={filterAction} actionType={Action.FILTER_EXCLUDE_PEER_ID} />
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

class TabComp extends Component {
  callback(key) {
    console.log(key);
  }

  TabContent(key, tabName, tabData, tableData, loading, pieChartData, barChartData) {
    return (
      <TabPane tab={tabName} key={key} className="tab-1-panel">
        <DropdownOptions contents={tabData.contents} data={tabData.data} mod={tabData.mod} filterAction={tabData.filterAction}
          labels={tabData.labels} selectedLabel={tabData.selectedLabel} />
        {/* <RenderAreaChart showFailedCount={this.props.showFailedCount} chartData={chartData} filteredLogs={filteredLogs} loading={loading}/> */}
        <RenderMultiDropDown data={tabData.labels.peerIds} mod={tabData.mod} filterAction={tabData.filterAction} />
        <Row gutter={24} className="chart-wrapper">
          <Col className="gutter-row" span={12}>
            <RenderPieChart data={pieChartData} loading={loading} protocolFilter={tabData.selectedLabel.protocolFilter} />
          </Col>
          <Col className="gutter-row" span={12}>
            <RenderBarChart data={barChartData} loading={loading} protocolFilter={tabData.selectedLabel.protocolFilter} />
          </Col>
        </Row>
        <RenderTable tableData={tableData} loading={loading} tabData={tabData} />
      </TabPane>
    )
  }

  render() {
    const { loading, tabData, tableData, pieChartData, barChartData } = this.props;
    return (
      <div className="tab-1">
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
          {this.TabContent(1, "All Activity", tabData, tableData, loading, pieChartData, barChartData)}
        </Tabs>
      </div>
    );
  }

}
export default TabComp;
