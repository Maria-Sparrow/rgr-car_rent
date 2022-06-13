import React, {useEffect, useState} from 'react';
import {ContainerStyle, MarginTopFromHeaderStyle, SpinnerBlockStyle, SpinnerStyle} from "../styles/General.styled"
import Header from "../components/Header";
import {
    ItemImgStyle,
    ItemMainBlockStyle,
    ItemMainTextBlockStyle,
    ItemMainTextParagraphStyle,
    ItemMainTextTitleStyle,
} from "../styles/Item.styled";
import LowBar from "../components/LowBar";
import {getCarById} from "../api/api";


function Item({match}) {
    const {params: {id}} = match;
    const [car, setCar] = useState(false);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        getCarById(id).then(car => {
            setCar(car);
            setSpinner(false)
        })
    }, [id]);

    return (
        <>
            <Header search={false}/>
            <MarginTopFromHeaderStyle>
                {spinner ?
                    <SpinnerBlockStyle>
                        <SpinnerStyle animation="border"/>
                    </SpinnerBlockStyle>
                    : (<ContainerStyle>
                        {car ?
                            <>
                                <ItemMainBlockStyle>
                                    <ItemImgStyle src={car.img} alt="Logo"/>
                                    <ItemMainTextBlockStyle>
                                        <ItemMainTextTitleStyle>
                                            {car.title}
                                        </ItemMainTextTitleStyle>
                                        <ItemMainTextParagraphStyle>
                                            Price: {car.price_in_USD} USD
                                        </ItemMainTextParagraphStyle>
                                        <ItemMainTextParagraphStyle>
                                            Brand: {car.brand} 
                                        </ItemMainTextParagraphStyle>
                                        <ItemMainTextParagraphStyle>
                                            Year: {car.year}
                                        </ItemMainTextParagraphStyle>
                                        <ItemMainTextParagraphStyle>
                                            Collateral: {car.price_in_USD/20} USD
                                        </ItemMainTextParagraphStyle>
                                    </ItemMainTextBlockStyle>
                                </ItemMainBlockStyle>

                                <LowBar price={car.price_in_USD} id={car.id} year={car.year} collateralAmount={car.collateral_amount}/>
                            </>
                            : "404"}

                    </ContainerStyle>)
                }

            </MarginTopFromHeaderStyle>
        </>
    );
};

export default Item;