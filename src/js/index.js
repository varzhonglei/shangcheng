import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import GoodsItem from './components/GoodsItem.js';
import GoodsInfor from './components/GoodsInfor.js';

export default class Index extends React.Component{
    constructor() {
        super();
        this.state = {
            loadInfor: '',
            goodsList: '',
            showGoodsInfor: '0',
            activeGoods: ''
        }
    }
    componentDidMount() {
        this.getLoadInfor();
        this.getGoodsList()
    }

    getGoodsList() {
        let _url = './api/goodsList.json';
        $.ajax({
            type: 'GET',
            dataType: 'json',
            asyn: true,
            url: _url,
            timeout: 8000,
            success: (data) => {
                this.setState({
                    goodsList: data.list
                })
            },
            error: () => {
                console.log('getGoodsList失败')
            }
        })
    }

    getLoadInfor() {
        let _url='./api/loadinfor.json';
        $.ajax({
            type: 'GET',
            dataType: 'json',
            asyn: true,
            url: _url,
            timeout: 8000,
            success: (data) =>{
                this.setState({
                    loadInfor: data.load
                })
            },
            error: () =>{
                console.log('getLoadInfo失败')
            }
        })
    }
    showGoodsInfor (show, val) {
        this.setState({
            showGoodsInfor: show,
            activeGoods: val
        })
    }
    toOrder () {
        let url = 'order.html';
        location.href = url;
    }


    render(){
        console.log(this.state)
        let goodsList = this.state.goodsList;
        let goodsListArr = [];
        if(goodsList != ''){
            goodsList.forEach( (item, index) => {
                goodsListArr.push(<GoodsItem key={index} activeGoods={item} handleShowGoodsInfor={this.showGoodsInfor.bind(this)}/>)
            })
        }
        return(
            <div className="wrap">
                <div className="tab_header">
                    <div className="header_loader">hi, {this.state.loadInfor.name}</div>
                    <div className="header_btn" onClick={this.toOrder.bind(this)}>我的订单</div>
                </div>
                <div className="tab_content">
                    {goodsListArr}
                </div>
                {
                    this.state.showGoodsInfor == '1' ? <GoodsInfor activeGoods={this.state.activeGoods}/> : null
                }
            </div>
        )
    }
}