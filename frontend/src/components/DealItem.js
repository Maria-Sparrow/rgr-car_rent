import React from 'react';
import zaporozh from '../images/zaporozh.jpg';

import {
    DealItemButtonStyle,    
    DealItemImgTitleWrapStyle,
    DealItemLiStyle, DealItemPriceDeleteBlockStyle,
    DealItemPriceStyle,
    DealItemTitleStyle
} from "../styles/DealItem.styled";
import { updateDeal } from '../api/api';

function DealItem({item, setDealItems, dealItems}) {

    function onReturn() {
        setDealItems(dealItems.map((deal) => deal.id === item.id ? {...deal, active: false} : deal))
        // send request to the backend
        updateDeal(item.id, {...item, active: false})
    }

    function onPayFine() {
        setDealItems(dealItems.map((deal) => deal.id === item.id ? {...deal, fine_paid: true} : deal))
        
        updateDeal(item.id, {...item, fine_paid: true})
    }

    return (
        <DealItemLiStyle style={{backgroundColor: item.active?"white": "#ccc"}}>
            <DealItemImgTitleWrapStyle>
                {item.car ? <img src={item.car.img} height="100%" alt='car'/> : null}
                <DealItemTitleStyle>{item.car?.brand}</DealItemTitleStyle>
            </DealItemImgTitleWrapStyle>

            <DealItemPriceDeleteBlockStyle>
                <DealItemPriceStyle>{item.price}$</DealItemPriceStyle>
                <DealItemButtonStyle onClick={onReturn} variant="outline-info" disabled={!item.active}>Return car</DealItemButtonStyle>
                <DealItemButtonStyle onClick={onPayFine} variant="outline-info" disabled={item.fine_paid || item.active}>Pay fine</DealItemButtonStyle>
            </DealItemPriceDeleteBlockStyle>
        </DealItemLiStyle>
    );
}

export default DealItem;