/**
 * @fileName: PrivateGo.jsx
 * Created on 2017-11-22
 *
 * 因私出国 管理页面
 *
 */
import React from "react";
// import Echart from "../charts/echart";
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
import {tableData} from '@/axios';
import axios from 'axios';

import ExtBaseicTable from '../tables/ExtBaseicTable';
import {ExtBaseicTableList} from "../com/ExtBaseicTableList";
import HumpgDialog from "../com/HumpgDialog";
import MoreDetDialog from "../com/MoreDetDialog";

const Option = Select.Option;
const Step = Steps.Step;
class PrivateGo extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            gettabledata:[],
            xzhou: [],
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
        fetchData({
            funcName: 'tableData',
            stateName: 'auth'});
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
        //  url参数（2个输入框中的值）
        console.log(v);
        const url = 'https://www.easy-mock.com/mock/5b74ea085ec4891242bc658a/table/timetable';
        axios({
            method: 'get',
            url: url
        }).then(res => {
            console.log(Array.isArray(res.data.dataValue))
            if(res.data.code === 1){
                this.setState((preState) => ({
                    gettabledata: res.data.dataValue
                }))
            }
        }).catch(err => {
            console.log(err);
        })
    };

    diffDate = (arr) => {
        let i, obj = {}, result = [], len = arr.length;
        for(i = 0; i < len; i++){
            if(!obj[arr[i]]){
                obj[arr[i]] = true;
                result.push(arr[i]);
            }
        }
        return result;
    };

    getechartdata = () => {
        const echartdata = this.state.gettabledata;
        let x, xzhou = [];
        echartdata.forEach((item) => {
            for(x in item) {
                if (x === 'date') {
                    xzhou.push(item[x])
                }
            }
        });
        return this.diffDate(xzhou);
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
        // console.log(Array.isArray(this.state.xzhou) );
        // let xlist = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        let legend = ["高风险", "中风险", "低风险"];

        datalist.push(new EcharBar('高风险', 'line', 'circle', 4, [120, 300, 402, 180, 590, 620, 200], '#35C9CB', 6));
        datalist.push(new EcharBar('中风险', 'line', 'circle', 4, [220, 100, 302, 280, 590, 220, 420], '#B9A6DF', 6));
        datalist.push(new EcharBar('低风险', 'line', 'circle', 4, [320, 400, 102, 80, 290, 320, 120], '#5EB3EF', 6));

        let expand = this.state.expand || false;
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" : <BaseEcharView option={echarCom.option} legend={legend} xAxis={this.getechartdata()} data={datalist}
                                                  style={{ height: '82%', width: '100%' }}/>;
        return <div className="gutter-example button-demo " style={{height: '100%', background: '#f1f1f1'}}>
            <BreadcrumbCustom first="因私出国(境)" indexName="综合事务管理"/>
            <Row gutter={10} className=" scrollable-container " style={{height: '100%'}}>
                <Col className="gutter-row" md={24}
                     style={{padding: '0px', backgroundColor: '#fff'}}>
                    <div style={{height: '100%'}}>
                        <div style={{padding: '5px 10px 0px'}}>
                            <Layout style={{background: '#fff',padding: '5px 10px'}}>
                                <div className="y-center justify-content">
                                    <div className="text-center" style={{flex: "0.8"}}>
                                        <div className="pull-left " style={{fontSize: "14px"}}>
                                            <Icon type="cloud" style={{marginRight: "3px"}}/>
                                            <span style={{fontSize: "13px"}}>风险防控</span>
                                        </div>

                                    </div>
                                    <Steps current={1} style={{flex: "6"}}>
                                        <Step status="process" title="本人申请"/>
                                        <Step status="process" title="领导审批"/>
                                        <Step status="process" title="领取证件"/>
                                        <Step status="process" title="出国（境）活动"/>
                                        <Step status="process" title="回国（入境）后交还证件"/>
                                    </Steps>

                                    <div className="pull-right" style={{flex: "2"}}>
                                            <span className="pull-right ">高风险 {tableComs.getStar1(3, "star")}
                                                中风险 {tableComs.getStar1(2, "star")} 低风险 {tableComs.getStar1(1, "star")}</span>
                                    </div>
                                </div>
                            </Layout>
                        </div>
                        <div style={{height: '350px', overflowX: 'hidden', padding: '0 10px'}}>
                            <div style={{background: '#fff',height: '100%'}}>
                                <ExtBaseicTable {...(tableComs.private_manger(expand))} />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col className="gutter-row" md={24}
                     style={{
                         height: '50%',
                         backgroundColor: "#fff ",
                         padding: '0 10px',
                         marginTop: '15px'
                     }}>
                    <div style={{background: '#fff',overflow: 'hidden',height: '100%'}}>
                    <div className=""
                         style={{width: "40%", height: '89%', float: "left", marginLeft: '5px', background: '#f1f1f1'}}>
                        <div style={{position: 'relative', height: '100%', paddingLeft: "15px" , paddingTop: '15px', background: "#fff"}}>
                            {/*<div style={{
                                height: '14%',
                                width: '100%',
                                marginLeft: '5px',
                                position: 'relative'
                            }}>
                                <div style={{fontSize: "14px", paddingTop: '14px'}}>
                                    <Icon type="area-chart" style={{marginRight: "3px"}}/>
                                    <span style={{fontSize: "13px"}}>风险监控统计</span>
                                </div>

                            </div>*/}


                            {ecahrs}
                            {/*<Echart gettabledata={this.state.gettabledata}/>*/}
                        </div>
                    </div>
                    <div className="" style={{width: "59%", float: "left"}}>
                        <Card bordered={false} noHovering={true} style={{height: '100%'}}>
                            <ExtBaseicTableList gettabledata={this.state.gettabledata}
                                                onDateChange={this.handleChange}
                                                func1={this.funBack1}
                                                func2={this.funBack2}/>
                        </Card>
                    </div>
                    </div>
                </Col>

            </Row>
            <HumpgDialog
                title="人工评估"
                submitText="提交"
                visible={this.state.visibleUpdate}
            />

            <MoreDetDialog
                title="详情"
                visible={this.state.visibleMore}
                gettabledata={this.state.gettabledata}
            />
            {
                Bacecomstyle
            }
        </div>
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


export default connect(mapStateToPorps, mapDispatchToProps)(PrivateGo);