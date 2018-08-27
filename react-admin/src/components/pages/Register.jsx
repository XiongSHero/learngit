/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Alert} from 'antd';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';

const FormItem = Form.Item;
const { Footer } = Layout;

class Register extends React.Component {

    state = {
        errorMesg: "",
        confirmDirty: false

    };

    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const { router } = this.props;
        // if (user != null) {
        //     router.push('/pageIndex/homepage');
        // }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps;
        const { router } = this.props;
        console.log(nextAuth.data)
        //  模拟后台数据，如果用户名重复，则显示错误
        if(nextAuth.data && nextAuth.data.data.code === '104'){
            console.log(1)
            this.setState({
                errorMesg: nextAuth.data.data.data != null ? nextAuth.data.data.data : nextAuth.data.data.message
            })
        }
        // 注册成功，登陆至主页面
       /* if (nextAuth.data && nextAuth.data.data.code === 101 && this.state.confirmDirty) {   // 判断是否登陆
            console.log(nextAuth.data,this.state.confirmDirty);

            // localStorage.setItem('user', JSON.stringify(nextAuth.data));
            router.push('/pageIndex/homepage');

        } else if (nextAuth.data && nextAuth.data.message !== null) {
            this.setState({
                errorMesg: nextAuth.data.data != null ? nextAuth.data.data : nextAuth.data.message
            });
        }*/
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.form.getFieldValue("userName"));
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const {fetchData} = this.props;
            if (values.userName !== '' && values.password !== '') {
                console.log(values);
                fetchData({
                    funcName: 'registerZcpt',
                    params: {
                        username: values.userName,
                        password: values.password
                    },
                    stateName: 'auth'
                });
            }
        });
    };
    //  用户名校验
    handleUsernameBlur = () => {
        this.props.form.validateFields(['userName'],(err, values) => {
            if (err) {
                return;
            }
            const {fetchData} = this.props;
            if (values.userName !== '') {
                console.log(values);
                fetchData({
                    funcName: 'registerWyzk',
                  /*  params: {
                        username: values.userName
                    },*/
                    stateName: 'auth'
                });
            }
        });
    }
    //  密码校验
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('2次密码不一致！');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };

    getErrView = () => {
        let msg = this.state.errorMesg || '';
        if (msg === '') {
            return msg;
        }
        return <Alert message={msg} type="error" closable showIcon/>;
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        let errView = this.getErrView();
        const formItemLayout = {
            labelCol: {
                xs: { span: 4   },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            }
        };
        return (
            <Layout className="login_layout">
                <div className="wrap">
                    <div className="login">
                        <div className="login-form" style={{height: '360px'}}>
                            <div className="login-logo">
                                <span style={{fontWeight:"bold"}}>廉政风险管理系统</span>
                            </div>
                            {errView}
                            <Form onSubmit={this.handleSubmit} style={{ maxWidth: '400px' }}>
                                <FormItem {...formItemLayout } label="用户名">
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>}
                                               placeholder="请输入用户名" onBlur={this.handleUsernameBlur}/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout } label="设置密码">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码!' },
                                            {validator: this.validateToNextPassword}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password"
                                               placeholder="请输入密码"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout } label="确认密码">
                                    {getFieldDecorator('comfirm', {
                                        rules: [{ required: true, message: '请输入密码!' },
                                            {validator: this.compareToFirstPassword}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password"
                                               placeholder="请再次输入密码" onBlur={this.handleConfirmBlur}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {/*<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>*/}
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{ width: '100%' }}>
                                        注册
                                    </Button>
                                    <a className="login-form-forgot" href="#" style={{float: 'right'}}>已有帐号？直接登录</a>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                    <Footer style={{ height: 80, textAlign: 'center', color: '#fff', background: "transparent" }}>
                        V1.0.0 ©2017 Created by wyzk
                    </Footer>
                </div>

            </Layout>
        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Register));