import React from 'react';
import $ from 'jquery';
import Address from './components/Address';

export default class Submit extends React.Component{
    constructor() {
        super();
        this.state = {
            userInfor: '',
            activeName: '',
            activePhone: '',
            activeAddress: '',
            showAddress: '0'
        }
    }
    setAddress(){
        this.setState({
            showAddress: '1'
        })
    }
    componentDidMount() {
        this.getUserInfor();
    }
    getUserInfor() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: './api/userInfor.json',
            success: (data) => {
                this.setState({
                    userInfor: data.address,
                    activeAddress: data.address[0].orderAddress,
                    activeName: data.address[0].name,
                    activePhone: data.address[0].mobile 
                })
            },
            error: () => {
                console.log('ajax getUserInfor 失败')
            }
        })
    }

    handleBack (val) {
        this.setState({
            showAddress: val
        })
    }

    handleChoiceAdd( showAddress, item ) {
        this.setState({
            showAddress: showAddress,
            activeName: item.name,
            activePhone: item.mobile,
            activeAddress: item.orderAddress
        })
    } 

    getQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        // console.log(window.location.search);
        // console.log(window.location.search.substr(1));
        // console.log(window.location.search.substr(1).match(reg)[2]);
        // encodeURIComponent
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return null;
    }
    toIndex () {
        let url = '/index.html';
        location.href = url;
    }
    render() {
        let name = decodeURIComponent(this.getQueryString('name')),
            spect = decodeURIComponent(this.getQueryString('spect')),
            number = this.getQueryString('number'),
            price = this.getQueryString('price'),
            img = this.getQueryString('img');
        let accMul = (arg1,arg2) => {   
            let m = 0, s1 = arg1.toString(), s2 = arg2.toString();        
            try {m += s1.split(".")[1].length} catch(e){}   
            try {m += s2.split(".")[1].length} catch(e){}   
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow( 10, m )   
        } //这个是随便百度的
        let allPrice =  accMul(number, price);

        return (
            <div className="submit_wrap">
                <div className="content">
                    <div className="content_one">
                        <p>配送信息</p>
                    </div>
                    <div className="content_two" onClick={this.setAddress.bind(this)}>
                        <p className="name_phone">
                            <span className="name">{this.state.activeName}</span>
                            <span className="phone">{this.state.activePhone}</span>
                        </p>
                        <p className="address">{this.state.activeAddress}</p>
                        <span className="icon">&gt;</span>
                    </div>
                    <div className="content_th">
                        <img src={img} alt=""/>
                        <div className="content_th_infor">
                            <p className="th_one">
                                <span className="th_one_name">{name}</span>
                                <span className="th_one_price">&#165;{price}</span>
                            </p>
                            <p className="th_two">
                                <span className="th_two_spect">{spect}</span>
                                <span className="th_two_number">X{number}</span>
                            </p>
                        </div>
                    </div>
                    <div className="content_fo">
                        <p>
                            <span className="pay_title">支付方式</span>
                            <span className="pay_money">现金支付</span>
                        </p>
                    </div>
                </div>
                <div className="footer">
                    <div className="total_price">
                        <span className="total_title">总价</span>
                        <span className="total_value">&#165;{allPrice}</span> 
                    </div>
                    <div className="submit_btn" onClick={this.toIndex.bind(this)}>提交订单</div>
                </div>
                {
                    this.state.showAddress == '1' ? <Address userInfor={this.state.userInfor} handleBack={this.handleBack.bind(this)} handleChoiceAdd={this.handleChoiceAdd.bind(this)}/> : null
                }
            </div>
        )
    }
}