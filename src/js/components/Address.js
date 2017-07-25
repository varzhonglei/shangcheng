import React from 'react';
import $ from 'jquery';

export default class Address extends React.Component{
    constructor() {
        super();
    }

    choiceAdd( item, e ) {
        $('.adderss_radius').removeClass('active_radius');
        $(e.target).addClass('active_radius');
        let showAddress = '0';
        let tempFn = () => {  //箭头函数能把 this 绑定到其定义的作用域中的this
            this.props.handleChoiceAdd( showAddress, item )
        }
        setTimeout( tempFn, 200 );
        
    }

    backToSubmit() {
        let showAddress = '0';
        this.props.handleBack(showAddress)
    }
    render() {
        let userInfor = this.props.userInfor,
            addressArr = [];
        if(userInfor){
            userInfor.forEach( ( item, index ) => {
                addressArr.push(
                    <div className="adderss_item" key={index}>
                        <div className="adderss_radius"  onClick={this.choiceAdd.bind(this, item)}></div>
                        <div className="adderss_right">
                            <p className="adderss_n_p">
                                <span className="adderss_name">{item.name}</span>
                                <span className="adderss_phone">{item.mobile}</span>
                            </p>
                            <p className="adderss_more">{item.orderAddress}</p>
                        </div>
                    </div>
                )
            })
        }
        return(
            <div className="adderss_wrap">
                <div className="adderss_header">
                    <div className="back" onClick={this.backToSubmit.bind(this)}>back</div>
                    <p className="adderss_title">收货地址</p>
                </div>
                <div className="adderss_content">
                    {addressArr}
                </div>
            </div>
        )
    }
}