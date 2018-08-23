import React from "react";
import {connect} from "react-redux";
import {Card, Col, Form, Modal, Row, Timeline} from "antd";
import TableComs from "./TableComs";


class MoreDetDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addLoading: false
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let visible = this.props.visible || false;
        let visibleNew = nextProps.visible || false;
        if (visibleNew !== visible) {
            this.setState({
                visible: true
            });
        }
       // console.log(nextProps.gettabledata);
       //  const detail =nextProps.gettabledata;
       //  detail.forEach((item) => {
       //
       //  })
    }

   /* getDetail = () => {
        const detail =this.props.gettabledata;
        let x,desDetail = [];
         detail.forEach((item, i) => {
            for(x in item) {
                if(x === 'key' && item[x] !== i){
                    return;
                }
                if(x === 'description'){
                    desDetail = item[x];
                }
            }
         })
        return desDetail;
    }*/
    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleOk = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({ addLoading: true });
                    //.........
                    this.setState({ addLoading: false, visible: false });
                }
            },
        );
    };

    getTimeLine = () => {
        let tableComs = new TableComs();
        return <Timeline>
            <Timeline.Item color="green">
                <div>
                    <Card title="2018-5-1" bordered={true}>
                        <p style={{ paddingLeft: '10px' }}>申请公车机场接XXX来我院视察工作，批准人:李四</p>
                        <p style={{ float: 'right' }}>责任人 : 刘德华</p>
                    </Card>
                </div>
            </Timeline.Item>
            <Timeline.Item color="green">
                <div>
                    <Card title="2018-5-2" bordered={true}>
                        <p style={{ paddingLeft: '10px' }}>评估结果: {tableComs.getStar(2, "star")}</p>
                        <p style={{ paddingLeft: '10px' }}>原因: 批准人李四无公车批复权限，批准无效</p>
                        <p style={{ float: 'right' }}>操作人 : 评估系统</p>
                    </Card>
                </div>
            </Timeline.Item>
            <Timeline.Item color="red">
                <div>
                    <Card title="2018-5-6" bordered={true}>
                        <p style={{ paddingLeft: '10px' }}>风险评估: 无风险</p>
                        <p style={{ paddingLeft: '10px' }}>原因: 张三因病请假，授权李四暂时接替公车外派事务。</p>
                        <p style={{ float: 'right' }}>操作人 : 张三</p>
                    </Card>
                </div>
            </Timeline.Item>
            <Timeline.Item>
                <div>
                    <Card title="2018-5-8" bordered={true}>
                        <p style={{ paddingLeft: '10px' }}>评估结果: {tableComs.getStar(1, "star")}</p>
                        <p style={{ paddingLeft: '10px' }}>原因: 因病请假，代理批复</p>
                        <p style={{ float: 'right' }}>操作人 : 评估系统</p>
                    </Card>
                </div>
            </Timeline.Item>
        </Timeline>
    };
    getTimeLine3 = () => {
        let tableComs = new TableComs();
        // const descrs = this.getDetail();

        const descrs =[{
            date: '2018-8-16',
            event: '申请公车去机场接xxx来我院观察，批准人：李四',
            person: '刘德华'
        },
            {
                date: '2018-8-17',
                resultRisk: 2,
                reason: '批准人李四无公车批复权限',
                person: '评估系统'
            },
            {
                date: '2018-8-18',
                resultRisk: 0,
                reason: '张三因病假，授权李四暂时接替',
                person: '张三'
            },
            {
                date: '2018-8-19',
                resultRisk: 1,
                reason: '因病请假，代理批复',
                person: '评估系统'
            }
        ];
        const descripe = descrs.slice(1);
        const itemList = descripe.map((descr, index) =>
            <Timeline.Item color="green" key={index}>
                <div>
                    <Card title={descr.date} bordered={true}>
                        <p style={{ paddingLeft: '10px'}}>评估结果：{descr.resultRisk ? tableComs.getStar(descr.resultRisk, 'star') : '无风险'}</p>
                        <p style={{ paddingLeft: '10px'}}>原因：{descr.reason}</p>
                        <p style={{ float: 'right'}}>操作人：{descr.person}</p>
                    </Card>
                </div>
            </Timeline.Item>
        );
        const first = descrs.splice(0,1);
        return (
            <Timeline>
                <Timeline.Item color="red">
                    <div>
                        <Card title={first[0].date} bordered={true}>
                            <p style={{ paddingLeft: '10px' }}>{first[0].event}</p>
                            <p style={{ float: 'right' }}>责任人 : {first[0].person}</p>
                        </Card>
                    </div>
                </Timeline.Item>
                {itemList}
            </Timeline>
        )
    }

    getTimeLine1 = () => {
        let tableComs = new TableComs();
        return <div style={{ width: '100%' }}>
            <Row>
                <Col span={12} push={12} style={{ borderLeft: '1px solid #B6B6B6' }}>
                    <div className="time-line">
                        <span>2018-5-2</span>
                        <Card noHovering={true} bordered={true}>
                            <p style={{ paddingLeft: '10px' }}>评估结果: {tableComs.getStar(2, "star")}</p>
                            <p style={{ paddingLeft: '10px' }}>原因: 批准人李四无公车批复权限，批准无效</p>
                            <p style={{ float: 'right' }}>操作人 : 评估系统</p>
                        </Card>
                    </div>
                    <div className="time-line">
                        <span>2018-5-8</span>
                        <Card noHovering={true} bordered={true}>
                            <p style={{ paddingLeft: '10px' }}>评估结果: {tableComs.getStar(1, "star")}</p>
                            <p style={{ paddingLeft: '10px' }}>原因: 因病请假，代理批复</p>
                            <p style={{ float: 'right' }}>操作人 : 评估系统</p>
                        </Card>
                    </div>
                </Col>

                <Col span={12} pull={12}>
                    <div>
                        <span style={{ float: 'right', marginRight: '10px' }}>2018-5-1</span>
                        <Card noHovering={true} bordered={true} style={{ float: 'right', marginRight: '10px' }}>
                            <p style={{ paddingLeft: '10px' }}>申请公车机场接XXX来我院视察工作，批准人:李四</p>
                            <p style={{ float: 'right' }}>责任人 : 刘德华</p>
                        </Card>
                    </div>

                    <div className="time-line" style={{ float: 'right' }}>
                        <span style={{ float: 'right', marginRight: '10px' }}>2018-5-6</span>
                        <Card noHovering={true} bordered={true} style={{ float: 'right', marginRight: '10px' }}>
                            <p style={{ paddingLeft: '10px' }}>风险评估: 无风险</p>
                            <p style={{ paddingLeft: '10px' }}>原因: 张三因病请假，授权李四暂时接替公车外派事务。</p>
                            <p style={{ float: 'right' }}>操作人 : 张三</p>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    };

    getTimeLine2 = () => {
        let tableComs = new TableComs();
        return (<div className="demo">
            <div className="row">
                <div className="col-md-12">
                    <div className="main-timeline">
                        <div className="timeline">
                            <div className="timeline-content">
                                <div className="circle"><span><i className="fa fa-globe"></i></span></div>
                                <div className="content">
                                    <span className="year">2018-5-1</span>
                                    <div>
                                        <Card noHovering={true} bordered={false}>
                                            <p style={{ textAlign: 'left' }}>申请公车机场接XXX来我院视察工作，批准人:李四</p>
                                            <p style={{ float: 'right' }}>责任人 : 刘德华</p>
                                        </Card>
                                    </div>
                                    <div className="icon"><span></span></div>
                                </div>
                            </div>
                        </div>

                        <div className="timeline">
                            <div className="timeline-content">
                                <div className="circle"><span><i className="fa fa-rocket"></i></span></div>
                                <div className="content">
                                    <span className="year">2018-5-2</span>
                                    <Card noHovering={true} bordered={false}>
                                        <p style={{ textAlign: 'left' }}>评估结果: {tableComs.getStar(2, "star")}</p>
                                        <p style={{ textAlign: 'left' }}>原因: 批准人李四无公车批复权限，批准无效</p>
                                        <p style={{ float: 'right' }}>操作人 : 评估系统</p>
                                    </Card>
                                    <div className="icon"><span></span></div>
                                </div>
                            </div>
                        </div>

                        <div className="timeline">
                            <div className="timeline-content">
                                <div className="circle"><span><i className="fa fa-briefcase"></i></span></div>
                                <div className="content">
                                    <span className="year">2018-5-6</span>
                                    <Card noHovering={true} bordered={false}>
                                        <p style={{ textAlign: 'left' }}>风险评估: 无风险</p>
                                        <p style={{ textAlign: 'left' }}>原因: 张三因病请假，授权李四暂时接替公车外派事务。</p>
                                        <p style={{ float: 'right' }}>操作人 : 张三</p>
                                    </Card>
                                    <div className="icon"><span></span></div>
                                </div>
                            </div>
                        </div>

                        <div className="timeline">
                            <div className="timeline-content">
                                <div className="circle"><span><i className="fa fa-mobile"></i></span></div>
                                <div className="content">
                                    <span className="year">2018-5-8</span>
                                    <Card noHovering={true} bordered={false}>
                                        <p style={{ textAlign: 'left' }}>评估结果: {tableComs.getStar(1, "star")}</p>
                                        <p style={{ textAlign: 'left' }}>原因: 因病请假，代理批复</p>
                                        <p style={{ float: 'right' }}>操作人 : 评估系统</p>
                                    </Card>
                                    <div className="icon"><span></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    };

    render() {
        const { title } = this.props;
        let visible = this.state.visible;
        let timeView = this.getTimeLine3();

        return (
            visible ?
                <Modal
                    visible={visible}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={600}
                    footer={null}
                >
                    <div>
                        {timeView}
                    </div>

                </Modal> : <div></div>
        );
    }


}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};

export default connect(mapStateToPorps)(Form.create({})(MoreDetDialog));