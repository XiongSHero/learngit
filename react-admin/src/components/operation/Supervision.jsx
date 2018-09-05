/**
 * @fileName: Selectioncadre.jsx
 * Created on 2017-11-24
 *
 * 工程运行管理-安全生产监督检查
 */
import React from "react";
import EcharCom from "../com/EcharCom";
import EcharBar from "../com/EcharBar";
import Bacecomstyle from "../Bacecomstyle";
import TableComs from "../com/TableComs";
import {Card, Col, Icon, Layout, Row, Select, Steps} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import BreadcrumbCustom from '../BreadcrumbCustom';
import BaseEcharView from '../charts/BaseEcharView';

import {fetchData, receiveData} from '@/action';
import axios from 'axios';

import ExtBaseicTable from '../tables/ExtBaseicTable';
import {ExtBaseicTableList} from "../com/ExtBaseicTableList";
import HumpgDialog from "../com/HumpgDialog";
import MoreDetDialog from "../com/MoreDetDialog";

const Option = Select.Option;
const Step = Steps.Step;
class Supervision extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            gettabledata: [],
            echartData: [],
            descrData: [],
            manHandle: '',
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
            this.setState({
                gettabledata: nextAuth.data.dataValue,
                echartData: nextAuth.data.echarData,
            })
        }
    }
    funBack1 = (row) => {
        this.showMoreModal();
        this.setState({
            descrData: row
        })
    };
    funBack2 = (value) => {
        this.showUpdateModal();
        this.setState({
            manHandle: value
        })
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
        //  url参数（2个输入框中的值）
        console.log(v);
        const url = 'https://www.easy-mock.com/mock/5b74ea085ec4891242bc658a/table/timetable';
        axios({
            method: 'get',
            url: url
        }).then(res => {
            // console.log(Array.isArray(res.data.dataValue))
            if(res.data.code === 1){
                this.setState((preState) => ({
                    gettabledata: res.data.dataValue,
                    echartData: res.data.echarData
                }))
            }
        }).catch(err => {
            console.log(err);
        })
    };

    // 单独发送echart的数据并处理
    getEchartData = () => {
        const echartdata = this.state.echartData;
        let x, arrDate = [], arrHigh = [], arrMiddle = [], arrLow = [];
        echartdata.forEach((item) => {
            for(x in item) {
                if(x === 'date'){
                    arrDate.push(item[x]);
                }
                else if(x === 'high') {
                    arrHigh.push(item[x]);
                }
                else if(x === 'middle'){
                    arrMiddle.push(item[x]);
                }
                else if(x === 'low') {
                    arrLow.push(item[x]);
                }
            }
        })
        return {arrDate, arrHigh, arrMiddle, arrLow}
    }
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
        let xlist = this.getEchartData().arrDate;
        let legend = ["高风险",     "中风险", "低风险"];
        datalist.push(new EcharBar('高风险', 'line', 'circle', 4, this.getEchartData().arrHigh, '#35C9CB', 6));
        datalist.push(new EcharBar('中风险', 'line', 'circle', 4, this.getEchartData().arrMiddle, '#B9A6DF', 6));
        datalist.push(new EcharBar('低风险', 'line', 'circle', 4, this.getEchartData().arrLow, '#5EB3EF', 6));

        let expand = this.state.expand || false;
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" : <BaseEcharView option={echarCom.option} legend={legend} xAxis={xlist} data={datalist}
                                                  style={{ height: '82%', width: '100%' }}/>;
        return (
            <div className="gutter-example button-demo " style={{ height: '100%',background: '#f1f1f1' }}>
                <BreadcrumbCustom first="安全生产监督检查" indexName="工程运行管理"/>
                <Row gutter={10} className=" scrollable-container " style={{ height: '95%' }}>
                    <Col className="gutter-row" md={24}
                         style={{ padding: '0px',   backgroundColor: '#fff' }}>
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
                                        <div style={{ flex: "5"}}>
                                            <Steps current={1} style={{width:'40%'}}>
                                                <Step status="process" title="安全监督检查"/>
                                                <Step status="process" title="安全隐患处理"/>
                                            </Steps>
                                        </div>
                                        <div className="pull-right" style={{ flex: "2" }}>
                                            <span className="pull-right ">高风险 {tableComs.getStar1(3, "star")}
                                                中风险 {tableComs.getStar1(2, "star")} 低风险 {tableComs.getStar1(1, "star")}</span>
                                        </div>
                                    </div>
                                </Layout>
                            </div>
                            <div style={{ height: '350px',overflowX:'hidden' }}>
                                <ExtBaseicTable {...(tableComs.project_safety_production_monitor_manger(expand))} />
                            </div>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={24}
                         style={{
                             height: '50%',
                             backgroundColor: "#fff",
                             marginTop: '10px',
                             overflow: 'hidden'
                         }}>
                        <div className="" style={{ width: "40%", height: '100%', float: "left", background: '#f1f1f1' }}>
                            <div style={{ position: 'relative', height: '100%', padding: '15px 0 0 15px', background: '#fff' }}>
                                {/*<div style={{
                                    height: '14%',
                                    width: '100%',
                                    paddingLeft: '5px',
                                    position: 'relative'
                                }}>
                                    <div style={{ fontSize: "14px" }}>
                                        <Icon type="area-chart" style={{ marginRight: "3px" }}/>
                                        <span style={{ fontSize: "13px" }}>风险监控统计</span>
                                    </div>

                                </div>*/}


                                {ecahrs}

                            </div>
                        </div>
                        <div className="" style={{ width: "60%",  float: "left" }}>
                            <Card bordered={false} noHovering={true} style={{ height: '100%' }}>
                                <ExtBaseicTableList gettabledata={this.state.gettabledata}
                                                    onDateChange={this.handleChange}
                                                    func1={(row) => this.funBack1(row)}
                                                    func2={(value) => this.funBack2(value)}/>
                            </Card>
                        </div>
                    </Col>

                </Row>
                <HumpgDialog
                    title="人工评估"
                    submitText="提交"
                    manHandle={this.state.manHandle}
                    visible={this.state.visibleUpdate}/>

                <MoreDetDialog
                    title="详情"
                    visible={this.state.visibleMore}
                    descrData={this.state.descrData}
                />
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


export default connect(mapStateToPorps, mapDispatchToProps)(Supervision);