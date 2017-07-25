import React from 'react';

export default class GoodsItem extends React.Component{
    constructor() {
        super();
    }

    showGoodsInfor() {
        let showGoodsInfor = '1';
        let activeGoods = this.props.activeGoods;
        this.props.handleShowGoodsInfor(showGoodsInfor, activeGoods)
    }
    render() {
        let activeGoods = this.props.activeGoods;
        return(
            <div className="goods_item" onClick={this.showGoodsInfor.bind(this)}>
                <img src={activeGoods.imgurl[0]} alt=""/>
                <div className="goods_item_infor">
                    <p className="item_name">{activeGoods.name}</p>
                    <p className="item_price">&#165;{activeGoods.spectList[0].price}</p>
                </div>
            </div>
        )
    }
}