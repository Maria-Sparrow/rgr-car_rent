import React, { useEffect, useState } from 'react';
import { ContainerStyle, MarginTopFromHeaderStyle } from "../styles/General.styled"
import Header from "../components/Header";
import {
    DealButtonsBlockStyle,
    DealButtonStyle,
    DealIsEmptyButtonStyle,
    DealItemEmptyStyle,
    DealItemsBlockStyle,
    DealItemsUlStyle,
    DealTitleStyle,
    DealTotalPriceStyle
} from "../styles/Deal.styled";
import { Link } from "react-router-dom";
import DealItem from "../components/DealItem";
import { getCars, getDealData, getDeals } from '../api/api';

function Deal() {
    let [totalPrice, setTotalPrice] = useState(0);
    // get items from http request to backend;
    let [dealItems, setDealItems] = useState([])

    let updateDealItems = (items) => {
        setDealItems(items);
        updateTotalPrice(items)
    }

    useEffect(() => {
        getDeals().then((data) => {
            updateDealItems(data.deals || []);
            getDealData().then((data) => {
                getCars().then((carData) => {
                    data.deals.forEach((deal) => {
                        deal.car = carData.cars.find((car) => car.id == deal.car_id);
                    })
                    updateDealItems(data.deals || []);             
                })
            });
        });
    }, [])

    function updateTotalPrice(deals) {
        setTotalPrice(deals
            .filter((deal) => deal.active)
            .map((deal) => deal.price)
            .reduce((prev, next) => prev + next, 0));
    }

    switch (true) {
        case (dealItems.length == 0):
            return (
                <>
                    <Header search={false} />
                    <MarginTopFromHeaderStyle>
                        <ContainerStyle>

                            <DealTitleStyle>Shopping Deal</DealTitleStyle>

                            <DealItemEmptyStyle>Deal is empty</DealItemEmptyStyle>
                            <DealItemEmptyStyle>
                                <Link to="/catalog">
                                    <DealIsEmptyButtonStyle variant="outline-info">Back to
                                        Catalog</DealIsEmptyButtonStyle>
                                </Link>
                            </DealItemEmptyStyle>

                        </ContainerStyle>
                    </MarginTopFromHeaderStyle>
                </>
            );
        default:
            return (
                <>
                    <Header search={false} />
                    <MarginTopFromHeaderStyle>
                        <ContainerStyle>

                            <DealTitleStyle>Shopping Deal</DealTitleStyle>
                            <DealItemsBlockStyle>
                                <DealItemsUlStyle>
                                    {dealItems.map((item) => {
                                        return (
                                        // todo: modify deal item component
                                        <DealItem key={item.id} item={item} setDealItems={updateDealItems} dealItems={dealItems}/>
                                    )})}
                                </DealItemsUlStyle>
                                <DealTotalPriceStyle>Total price: {totalPrice}$</DealTotalPriceStyle>
                            </DealItemsBlockStyle>

                            <DealButtonsBlockStyle>
                                <Link to="/catalog">
                                    <DealButtonStyle variant="outline-info">Back to
                                        Catalog</DealButtonStyle>
                                </Link>
                            </DealButtonsBlockStyle>
                        </ContainerStyle>
                    </MarginTopFromHeaderStyle>
                </>
            );
    }
}

export default Deal;