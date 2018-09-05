import React from "react";
import {Icon, DatePicker, message} from "antd";
import moment from "moment/moment";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import axios from "axios";

const { RangePicker } = DatePicker;

export class ExtBaseicTableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            devicelist: [],
            pagination: {},
            // loading: true,
            startDate: this.getDay(-3),
            endDate: this.getDay(0),
        };

        this.data_columns = [{
            title: '责任人',
            dataIndex: 'liable',
            width: 100,
        }, {
            title: '时间',
            dataIndex: 'date',
            width: 150,
        }, {
            title: '环节',
            dataIndex: 'hdata',
            width: 150,
        }, {
            title: '风险评估',
            dataIndex: 'risk',
            width: 100,
        }, {
            title: '详情',
            dataIndex: 'description',
            width: 100,
            render: (text, record, index) => this.renderStateContent(text, record, index),
        }, {
            title: '操作',
            dataIndex: 'link',
            width: 150,
            render: (text, record, index) => this.renderOperationContent(text, record, index),
        }];
    }

    getDay = (day) => {
        let today = new Date();

        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
    };

    doHandleMonth = (month) => {
        let m = month;
        if (month.toString().length === 1) {
            m = "0" + month;
        }
        return m;
    };

    renderStateContent = (value, row, index) => {
        // console.log( row['description'])
        let rowData = row['description'];
        return <div className=" flex-center">
            <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                <Icon onClick={() => this.funBack1(rowData)} type={"book"} style={{ margin: '3px', color: '#1ABC9C' }}/>
            </div>
        </div>;
    };
    renderOperationContent = (value, row, index) => {
        // console.log(value)
        return <div className=" flex-center">
            <a style={{ marginRight: '4px' }} onClick={() => this.funBack2(value)}>人工评估</a>
        </div>;
    };

    funBack1 = (row) => {
       /* const { func1 } = this.props;
        if (typeof func1 === "function") {
            func1("111111");
        }*/
       this.props.func1(row);
        // console.log( row)
    };
    funBack2 = (value) => {
        /*const { func2 } = this.props;
        if (typeof func2 === "function") {
            func2("22222");
        }*/
        this.props.func2(value);
    };
    // 获取父组件中的state，处理数据并渲染UI
    getDatas = () => {
        // console.log(this.props.gettabledata);
        const tabledata = this.props.gettabledata;

        tabledata.forEach( (item) => {
            for(let x in item){
                if(x === 'risk'){
                    if(typeof item[x] === 'number'){
                        item[x] = this.getStar(item[x], 'star');
                    }
                }
            }
        });
        console.log(tabledata);
        /*let data = [];
        for (let i = 0; i < 5; i++) {
            data.push({
                key: i,
                liable: `李广`,
                date: '2016年04月05日',
                hdata: "印章刻制",
                description: `详情`,
                risk: this.getStar(2, "star"),
            });
        }
        console.log(data);*/
        return tabledata;
    };

    //星星的图标显示
    getStar = (i, string) => {
        // return <Rate count={i} disabled defaultValue={i} style={{ color:"#00CC00",fontSize: 16 }}/>;
        let iconView = [];
        let colorString = string == null ? "star" : string;

        for (let j = 0; j < i; j++) {
            iconView.push(<Icon type={"star"} key={j + i} style={{ margin: '3px', color: '#0fb0f0' }}/>);
        }
        for (let j = 0; j < 3 - i; j++) {
            iconView.push(<Icon type="star-o" key={j + 3 - i} style={{ margin: '3px', color: '#0fb0f0' }}/>);
        }
        return <span>{iconView}</span>;
    };

    //星星的图标显示
    getStar1 = (i, string) => {
        // return <Rate count={i} disabled defaultValue={i} style={{ color:"#00CC00",fontSize: 16 }}/>;
        let iconView = [];
        let colorString = string == null ? "star" : string;

        for (let j = 0; j < i; j++) {
            iconView.push(<Icon type="star" key={j} style={{ margin: '3px', color: '#0fb0f0' }}/>);
        }
        return <span>{iconView}</span>;
    };

    handOnChangeTime = (value, dateString) => {
        // const { onDataChange } = this.props;
       this.props.onDateChange(dateString);
       console.log(dateString)
    };

    // 禁止选择今天以后的时间
     disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

    isLoading = () => {
         return this.props.loading;
    }
    render() {
        const dateFormat = 'YYYY-MM-DD';
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;


        return (
            <div>
                <div className='device_text' style={{ width: '100%', textAlign: 'center', paddingTop: '3px', overflow: 'hidden'}}>
                    <RangePicker
                        style={{ float: 'right' }}
                        defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                        format={dateFormat}
                        onChange={this.handOnChangeTime}
                        disabledDate={(current) => this.disabledDate(current)}
                        dateRender={(current) => {
                            const style = {};
                            if (current.date() === 1) {
                                style.border = '1px solid #1890ff';
                                style.borderRadius = '50%';
                            }
                            return (
                                <div className="ant-calendar-date" style={style}>
                                    {current.date()}
                                </div>
                            );
                        }}
                    />
                    <span className="device_text"
                          style={{
                              height: '100%',
                              marginRight: '20px',
                              marginTop: '5px',
                              float: 'right'
                          }}>根据时间查询 : </span>
                </div>
                <div style={{ float: 'right', width: '100%', paddingTop: '16px'}}>
                    <ExtBaseicTable columns={this.data_columns}
                                    data={this.getDatas()}
                                    pagination={{ pageSize: 6 }}
                                    scroll={{ y: 210 }}
                                    bordered={true}
                                    loading={this.isLoading()}
                                    size="small"
                                    style={{ margin: "5px", height: '100%' }}/>
                </div>


            </div>
        );
    }
}