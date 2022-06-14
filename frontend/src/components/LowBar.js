import React, { useState } from 'react';
import { LowBarButtonsStyle, LowBarButtonStyle, LowBarStyle, LowBarTextStyle, LowBarInputDaysStyle } from "../styles/LowBar.styled";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccess } from '../redux/accessSlice';
import { registerDeal } from '../api/api';
// import { addToDealAsync } from "../redux/dealSlice";



function LowBar({ price, id, year, collateralAmount }) {
    let history = useHistory();

    let [inputValue, setInputValue] = useState("");

    const dispatch = useDispatch();

    let [priceForDays, setPriceForDays] = useState(price*0.01);

    async function onAddToDealClick() {
        // send http request to create a deal, passing price and days.
        
        registerDeal(id, priceForDays, inputValue, price/20);
        
        // navigate to user deals

        history.push("/deal");

        // dispatch(addToDealAsync(id))
    }

    return (
        <LowBarStyle>
            <LowBarTextStyle>Rent price: {priceForDays} USD</LowBarTextStyle>
            <LowBarButtonsStyle>
                {/* Input for number of days for орендування of the car */}
                <LowBarInputDaysStyle type={"number"} onChange={(e) => {
                    let days = e.target.value;
                    setInputValue(days);
                    
                    setPriceForDays(15*days*(year-1960) + price*0.01);
                }} value={inputValue} placeholder="number of days" />

                <LowBarButtonStyle onClick={onAddToDealClick} variant="outline-info">Rent</LowBarButtonStyle>
                <Link to="/catalog">
                    <LowBarButtonStyle variant="outline-info">Go back</LowBarButtonStyle>
                </Link>
            </LowBarButtonsStyle>


            {/* TextView з відразу підготовленою ціною за кількістю днів. */}
        </LowBarStyle>
    );
}

export default LowBar;

