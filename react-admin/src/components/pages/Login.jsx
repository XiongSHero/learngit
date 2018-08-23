/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Alert} from 'antd';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';

const FormItem = Form.Item;
const { Footer } = Layout;

class Login extends React.Component {

    state = {
        errorMesg: "",
        isRemember: true

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
        const  loginData = JSON.parse(localStorage.getItem("mm_loginStatus"));
        if(this.state.isRemember && loginData){
            console.log(loginData.userName);

                this.props.form.setFieldsValue({
                    'userName': loginData.userName,
                    'password': loginData.userPassword,
                    'remember': this.state.isRemember
                });
        } else {
            this.props.form.setFieldsValue({'userName': ''});
            this.props.form.setFieldsValue({'password': ''});
            this.setState({
                isRemember: !this.state.isRemember
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps;
        const { router } = this.props;

        if (nextAuth.data && nextAuth.data.code === 0) {   // 判断是否登陆
            console.log(this.state.isRemember)

            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            router.push('/pageIndex/homepage');

        } else if (nextAuth.data && nextAuth.data.message !== null) {
            this.setState({
                errorMesg: nextAuth.data.data != null ? nextAuth.data.data : nextAuth.data.message
            });
        }
    }

    handleRemeber = (e) => {
        this.setState({
            isRemember: e.target.checked
        });
        console.log(this.state.isRemember)
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
                    funcName: 'loginWyzk',
                    params: {
                        username: values.userName,
                        password: values.password
                    },
                    stateName: 'auth'
                });

            if (this.state.isRemember) {
                let loginData = {};
                loginData.userName = this.props.form.getFieldValue("userName");
                loginData.userPassword = this.props.form.getFieldValue("password");
                loginData.isRemember = this.state.isRemember;
                console.log(loginData)
                localStorage.setItem("mm_loginStatus", JSON.stringify(loginData));
            } else {
                localStorage.removeItem("mm_loginStatus")
            }
            }
        });
    };
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
        return (
            <Layout className="login_layout">
                <div className="wrap">
                    <div className="login">
                        <div className="login-form">
                            <div className="login-logo">
                                <span style={{fontWeight:"bold"}}>廉政风险管理系统</span>
                            </div>
                            {errView}
                            <Form onSubmit={this.handleSubmit} style={{ maxWidth: '400px' }}>
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>}
                                               placeholder="请输入用户名"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password"
                                               placeholder="请输入密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.isRemember,
                                    })(
                                        <Checkbox onClick={this.handleRemeber}>记住我</Checkbox>
                                    )}
                                    {/*<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>*/}
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{ width: '100%' }}>
                                        登录
                                    </Button>
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


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));