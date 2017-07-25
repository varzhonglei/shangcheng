import React from 'react';
import $ from 'jquery';

export default class BuyWindow extends React.Component{
    constructor() {
        super();
        this.state = {
            activePrice : '',
            activeQuantity : '',
            activeSpect: '',
            number : 1
        }
    }
    closeBuyWindow() {
        let showBuyWindow = '0';
        this.props.handleCloseBuyWindow(showBuyWindow)
    }
    choiceSpect (e) {
        $('.buy_spect_li').removeClass('buy_spect_active');
        let target = $(e.target);
        target.addClass('buy_spect_active');
        this.props.spectList.forEach( (item, index) => {
            if(item.spect == target.text()){
                this.setState({
                    activePrice : item.price,
                    activeQuantity : item.quantity,
                    activeSpect: item.spect
                })
            }
        })
    }
    decrease () {
        let number = this.state.number;
        if( number > 1 ){
            this.setState({
            number : number - 1
            })
        }
    }
    add () {
        let number = this.state.number;
        if( number < this.state.activeQuantity ){
            this.setState({
            number : number + 1
            })
        }
    }
    sureSpect () {
        let showBuyWindow = '0',
            activePrice = this.state.activePrice,
            activeSpect = this.state.activeSpect,
            activeNumber = this.state.number;
        if(this.state.activePrice != ''){
            this.props.handleSureSpect(showBuyWindow, activePrice, activeSpect, activeNumber)
        }
    }

    render() {
        let spectList = this.props.spectList,
            maxMixPrice = this.props.maxMixPrice;
        let spectListArr = [];
        spectList.forEach( ( item, index ) => {
            if( item.quantity > 0 ){
                spectListArr.push( <li key={ index } className="buy_spect_li " onClick={ this.choiceSpect.bind(this) }>{item.spect}</li> )
            }else{
                spectListArr.push( <li key={ index } className="buy_spect_gray">{item.spect}</li> )
            }
        })
        let activePrice;
        if(this.state.activePrice == ''){
            activePrice = maxMixPrice.mixPrice +'~' + maxMixPrice.maxPrice;
        }else{
            activePrice = this.state.activePrice
        }
        return (
            <div className="buy_wrap"> 
                <div className="buy_gray" onClick={this.closeBuyWindow.bind(this)}></div>
                <div className="buy_content">
                    <div className="buy_price buy_content_item">
                        <div className="buy_price_title buy_left">价格</div>
                        <div className="buy_price_wrap">
                            <span className='price_value'>&#165;{activePrice}</span>
                            <span className='price_quantity'>{this.state.activeQuantity}</span>
                        </div>
                    </div>
                    <div className="buy_spect buy_content_item">
                        <div className="buy_spect_title">规格</div>
                        <div className="buy_spect_wrap">
                            <ul>
                                { spectListArr }
                            </ul>
                        </div>
                    </div>
                    <div className="buy_number buy_content_item">
                        <div className="buy_number_title">数量</div>
                        <div className="buy_number_wrap">
                            <ul>
                                <li className="buy_number_decrease" onClick={this.decrease.bind(this)}>-</li>
                                <li className="buy_number_value">{this.state.number}</li>
                                <li className="buy_number_add" onClick={this.add.bind(this)}>+</li>
                            </ul>
                        </div>
                    </div>
                    <div className="buy_ok" onClick={this.sureSpect.bind(this)}>
                        <a href="javascript:;">确认</a>
                    </div>
                </div> 
            </div>
        )
    }
}