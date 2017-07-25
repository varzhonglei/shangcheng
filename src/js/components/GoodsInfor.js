import React from 'react';
import BuyWindow from './BuyWindow.js';

export default class GoodsInfor extends React.Component{
    constructor () {
        super ();
        this.state = {
            showBuyWindow : '0',
            activePrice: '',
            activeNumber : '',
            activeSpect: '商品型号'
        }
    }

    showBuyWindow () {
        this.setState({
            showBuyWindow : '1'
        })
    }

    handleCloseBuyWindow ( val ) {
        this.setState({
            showBuyWindow : val
        })
    }
    handleSureSpect( val , activePrice, activeSpect, activeNumber) {
        this.setState({
            showBuyWindow: val,
            activePrice: activePrice,
            activeSpect: activeSpect,
            activeNumber: activeNumber
        })
    }
    toSubmit () {
        let name = decodeURIComponent(this.props.activeGoods.name),
            spect = decodeURIComponent(this.state.activeSpect),
            number = this.state.activeNumber,
            img = this.props.activeGoods.imgurl[1],
            price = this.state.activePrice; 
        if (this.state.activeNumber != ''){
            location.href = './submit.html' + '?' + 'name=' + name + '&' + 'spect=' + spect + '&' + 'number=' + number + '&' + 'img=' + img + '&' + 'price=' +price;
        }
    }
    render (){
        let activeGoods = this.props.activeGoods;
        let maxPrice = activeGoods.spectList[0].price,
            mixPrice = activeGoods.spectList[0].price;
        activeGoods.spectList.forEach( (item, index) => {
            if(maxPrice < activeGoods.spectList[index].price){
                maxPrice = item.price
            }
            if(mixPrice > activeGoods.spectList[index].price){
                mixPrice = item.price
            }
        });
        let maxMixPrice = {
            'maxPrice' : maxPrice,
            'mixPrice' : mixPrice   
            };
        let imgArr = [];
        activeGoods.imgurl.forEach( ( item, index ) => {
            imgArr.push( <img src={item} alt="" key = {index}/> )
        }) 
        let activePrice = this.state.activePrice;
        if( activePrice == '' ){
            activePrice = mixPrice + '~' + maxPrice
        }
        let activeNumber = this.state.activeNumber;
        if( activeNumber != ''){
            activeNumber = ' x' + activeNumber
        }
        return(
            <div className="goods_infor_wrap">
                <div className="infor_one infor_wrap">
                    <img src={activeGoods.imgurl[0]} alt=""/>
                    <div className="one_wrap">
                        <h3 className="one_name">{activeGoods.name}</h3>
                        <p className="one_price">&#165; {activePrice + activeNumber}</p>
                    </div>
                </div>
                <div className="infor_two infor_wrap" onClick={this.showBuyWindow.bind(this)}>
                    <p>选择&nbsp; {this.state.activeSpect}
                        <span>&gt;</span>
                    </p>
                </div>
                <div className="infor_th infor_wrap">
                    <h2>商品详情</h2>
                    <p>{activeGoods.name}</p>
                    {imgArr}
                </div>
                <div className="infor_fo infor_wrap"  onClick={this.toSubmit.bind(this)}>
                    <a href="javascript:;">立即购买</a>
                </div>
                {
                    this.state.showBuyWindow == '1' ? <BuyWindow handleCloseBuyWindow={this.handleCloseBuyWindow.bind(this)}  spectList={activeGoods.spectList} maxMixPrice={maxMixPrice} handleSureSpect={this.handleSureSpect.bind(this)}/> : null
                }
            </div>
        )
    }
}