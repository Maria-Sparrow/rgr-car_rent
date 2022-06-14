import React from 'react';
import {
    ItemLiStyle, ItemImgWrapStyle, ItemTitleStyle,
    ItemParagraphStyle, ItemButtonsBlockStyle, ItemImgStyle, ItemButtonStyle, ItemButtonLinkStyle
} from "../styles/ItemCard.styled"


function ItemCard({item}) {
    return (
        <ItemLiStyle>
            <ItemImgWrapStyle>
                <ItemImgStyle src={item.img} alt="car image"/>
            </ItemImgWrapStyle>
            <ItemParagraphStyle>Brand: {item.brand} </ItemParagraphStyle>
            <ItemParagraphStyle>Year: {item.year} </ItemParagraphStyle>
            <ItemParagraphStyle>Price: {item.price_in_USD} USD</ItemParagraphStyle>
            <ItemButtonsBlockStyle>
                <ItemButtonLinkStyle to={"/catalog" + item.id}>
                    <ItemButtonStyle variant="outline-info"> Show more </ItemButtonStyle>
                </ItemButtonLinkStyle>
            </ItemButtonsBlockStyle>
        </ItemLiStyle>
    );
}

export default ItemCard;