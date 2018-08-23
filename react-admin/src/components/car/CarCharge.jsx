/**
 * @fileName: CarCharge.jsx
 * Created on 2017-11-22
 *
 * 车辆加油管理页面
 */
import React from 'react';
import {Card, Col, Icon, Layout, Row, Select, Steps} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import BreadcrumbCustom from '../BreadcrumbCustom';
import Bacecomstyle from '../Bacecomstyle';
import BaseEcharView from '../charts/BaseEcharView';
import EcharCom from '../com/EcharCom';

import {fetchData, receiveData} from '@/action';
import TableComs from '../com/TableComs';

import ExtBaseicTable from '../tables/ExtBaseicTable';
import EcharBar from '../com/EcharBar';
import {ExtBaseicTableList} from "../com/ExtBaseicTableList";
import HumpgDialog from "../com/HumpgDialog";
import MoreDetDialog from "../com/MoreDetDialog";

const Option = Select.Option;
const Step = Steps.Step;

class CarCharge extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            gettabledata: [],
            echartsFlag: false,
            first: false,
            expand: false,
            queryParam: {
                'activityId': 1,//活动ID
                'statisDate': d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate(),//查询日期默认当天
                'userType': 1,//
            }
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
        // console.log("auth +++++" + JSON.stringify(this.props.auth));

        const { fetchData } = this.props;
        //调用 http请求 获取网络数据
        fetchData({funcName: 'tableData', stateName: 'auth'});
    }

    componentDidMount() {
        let first = this.state.first || false;
        if (!first) {
            this.setState({
                first: true
            });
        }
    }

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {
        const {auth: nextAuth = {}} = nextProps;
        if(nextAuth.data && nextAuth.data.code === 0){
            console.log(nextAuth.data.dataValue);
            this.setState({
                gettabledata: nextAuth.data.dataValue
            })
        }
    }
    funBack1 = () => {
        this.showMoreModal();
    };
    funBack2 = () => {
        this.showUpdateModal();
    };

    showUpdateModal = () => {
        this.setState({
            visibleUpdate: !this.state.visibleUpdate,
        });
    };
    showMoreModal = () => {
        this.setState({
            visibleMore: !this.state.visibleMore,
        });
    };



    handleChange = (v) => {

    };

    handleButton = () => {
        let state = this.state.expand || false;
        this.setState({
            expand: !state,
        });
    };

    render() {
        let tableComs = new TableComs();
        let echarCom = new EcharCom();

        let datalist = [];
        let xlist = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        let legend = ["高风险", "中风险", "低风险"];

        datalist.push(new EcharBar('高风险', 'line', 'circle', 4, [120, 300, 402, 180, 590, 620, 200], '#35C9CB', 6));
        datalist.push(new EcharBar('中风险', 'line', 'circle', 4, [220, 100, 302, 280, 590, 220, 420], '#B9A6DF', 6));
        datalist.push(new EcharBar('低风险', 'line', 'circle', 4, [320, 400, 102, 80, 290, 320, 120], '#5EB3EF', 6));

        let expand = this.state.expand || false;
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" : <BaseEcharView option={echarCom.option} legend={legend} xAxis={xlist} data={datalist}
                                                  style={{ height: '82%', width: '100%' }}/>;
        return (
            <div className="gutter-example button-demo " style={{ height: '100%',background: '#f1f1f1' }}>
                <BreadcrumbCustom first="公务用车管理" second="车辆加油" indexName="综合事务管理"/>
                <Row gutter={10} className=" scrollable-container " style={{ height: '95%' }}>
                    <Col className="gutter-row" md={24}
                         style={{ padding: '0px',  backgroundColor: '#fff' }}>
                        <div style={{ height: '100%' }}>
                            <div style={{ padding: '5px 10px' }}>
                                <Layout style={{ background: "#fff" }}>
                                    <div className="y-center justify-content">
                                        <div className="text-center" style={{ flex: "0.8" }}>
                                            <div className="pull-left " style={{ fontSize: "14px" }}>
                                                <Icon type="cloud" style={{ marginRight: "3px" }}/>
                                                <span style={{ fontSize: "13px" }}>风险防控</span>
                                            </div>

                                        </div>
                                        <Steps current={1} style={{ flex: "6" }}>
                                            <Step status="process" title="总油卡充值"/>
                                            <Step status="process" title="分油卡拨款"/>
                                            <Step status="process" title="加油站加油"/>
                                        </Steps>

                                        <div className="pull-right" style={{ flex: "2" }}>
                                            <span className="pull-right ">高风险 {tableComs.getStar1(3, "star")}
                                                中风险 {tableComs.getStar1(2, "star")} 低风险 {tableComs.getStar1(1, "star")}</span>
                                        </div>
                                    </div>
                                </Layout>
                            </div>
                            <div style={{ height: '350px',overflowX:'hidden' }}>
                                <ExtBaseicTable {...(tableComs.car_charge_manger(expand))} />
                            </div>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={24}
                         style={{
                             height: '50%',
                             backgroundColor: "#fff",
                             marginTop: '10px'
                         }}>
                        <div className="" style={{ width: "40%", height: '100%', float: "left" }}>
                            <div style={{ position: 'relative', height: '100%',paddingTop: "20px", paddingLeft: "10px"  }}>
                                {/*<div style={{*/}
                                    {/*height: '14%',*/}
                                    {/*width: '100%',*/}
                                    {/*paddingLeft: '5px',*/}
                                    {/*position: 'relative'*/}
                                {/*}}>*/}
                                    {/*<div style={{ fontSize: "14px" }}>*/}
                                        {/*<Icon type="area-chart" style={{ marginRight: "3px" }}/>*/}
                                        {/*<span style={{ fontSize: "13px" }}>风险监控统计</span>*/}
                                    {/*</div>*/}

                                {/*</div>*/}


                                {ecahrs}

                            </div>
                        </div>
                        <div className="" style={{ width: "60%",  float: "left" }}>
                            <Card bordered={false} noHovering={true} style={{ height: '100%' }}>
                                <ExtBaseicTableList gettabledata={this.state.gettabledata}
                                    func1={this.funBack1}
                                    func2={this.funBack2}/>
                            </Card>
                        </div>
                    </Col>

                </Row>
                <HumpgDialog
                    title="人工评估"
                    submitText="提交"
                    visible={this.state.visibleUpdate}/>

                <MoreDetDialog
                    title="详情"
                    visible={this.state.visibleMore}/>
                {
                    Bacecomstyle
                }
            </div>
        )
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return {auth};
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(CarCharge);