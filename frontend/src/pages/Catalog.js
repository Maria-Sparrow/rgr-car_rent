import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemCard from "../components/ItemCard"
import {ContainerStyle, MarginTopFromHeaderStyle, SpinnerBlockStyle, SpinnerStyle} from "../styles/General.styled"
import {CatalogListStyle} from "../styles/Catalog.styled"
import {getCars, getDeals} from "../api/api";


function Catalog() {

    const [cars, setCars] = useState([]);
    const [carsToShow, setCarsToShow] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        getCars().then(data => {
            getDeals().then((dealData) => {
                let rentedCarIds = dealData.deals.filter((deal) => deal.active).map((deal) => deal.car_id);
                let tempCars = data.cars.filter((car) => !rentedCarIds.includes(car.id))
                setCars(tempCars)
                setCarsToShow(tempCars);
                setSpinner(false);                    
            })
        })
    }, []);

    return (
        <>
            <Header search={true} cars={cars} setCarsToShow={setCarsToShow}/>
            <MarginTopFromHeaderStyle>
                <Filter setCarsToShow={setCarsToShow} setSpinner={setSpinner}/>
                {spinner ?
                    <SpinnerBlockStyle>
                        <SpinnerStyle animation="border"/>
                    </SpinnerBlockStyle>
                    :
                    (<ContainerStyle>
                        <CatalogListStyle>
                            {carsToShow.map((item) => (
                                <ItemCard key={item.id} item={item}/>
                            ))}
                        </CatalogListStyle>
                    </ContainerStyle>)
                }
            </MarginTopFromHeaderStyle>
        </>
    );
}

;

export default Catalog;