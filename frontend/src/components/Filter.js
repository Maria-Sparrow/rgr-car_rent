import {FilterBlock, FilterHr, NavFilterItemStyle} from "../styles/Filter.styled";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {HeaderFilterButtonStyle} from "../styles/General.styled";
import React, {useEffect, useState} from "react";
import { priceConstants, yearConstants} from "../constants/constants";
import {getFilteredCars} from "../api/api";

function Filter({setCarsToShow, setSpinner}) {

    const [filter, setFilter] = useState({
        priceFilter: priceConstants.default,
        yearFilter: yearConstants.default
    });

    useEffect(() => {
        getFilteredCars(filter.priceFilter, filter.yearFilter).then(filteredCars => {
            setCarsToShow([...filteredCars.cars]);
            setSpinner(false);
        })
        return () => {
            setSpinner(true);
        };
    }, [filter, setCarsToShow, setSpinner]);


    const [priceActive, setPriceActive] = useState({
        asc: false,
        desc: false,
        default: true
    });
    const [yearActive, setYearActive] = useState({
        asc: false,
        desc: false,
        default: true
    });


    const onPriceClick = (e) => {
        const text = e.target.text;
        if (text === priceConstants.asc) {
            if (priceActive.asc === false) {
                setPriceActive({
                    asc: true,
                    desc: false,
                    default: false
                });
                setFilter({...filter, priceFilter: text});
            }
        } else if (text === priceConstants.desc) {
            if (priceActive.desc === false) {
                setPriceActive({
                    asc: false,
                    desc: true,
                    default: false
                });
                setFilter({...filter, priceFilter: text});
            }
        } else if (text === priceConstants.default) {
            if (priceActive.default === false) {
                setPriceActive({
                    asc: false,
                    desc: false,
                    default: true
                });
                setFilter({...filter, priceFilter: text});
            }
        }
    }
    const onYearClick = (e) => {
        const text = e.target.text;
        if (text === yearConstants.asc) {
            if (yearActive.asc === false) {
                setYearActive({
                    asc: true,
                    desc: false,
                    default: false
                });
                setFilter({...filter, yearFilter: text});
            }
        } else if (text === yearConstants.desc) {
            if (yearActive.desc === false) {
                setYearActive({
                    asc: false,
                    desc: true,
                    default: false
                });
                setFilter({...filter, yearFilter: text});
            }
        } else if (text === yearConstants.default) {
            if (yearActive.default === false) {
                setYearActive({
                    asc: false,
                    desc: false,
                    default: true
                });
                setFilter({...filter, yearFilter: text});
            }
        }
    }

    const onClearClick = () => {
        setFilter({
            priceFilter: priceConstants.default,
            yearFilter: yearConstants.default
        });
        setPriceActive({
            asc: false,
            desc: false,
            default: true
        });
        setYearActive({
            asc: false,
            desc: false,
            default: true
        });
    }

    return (
        <>
            <FilterHr/>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <FilterBlock>
                                <NavFilterItemStyle>Price:</NavFilterItemStyle>
                                <NavDropdown title={filter.priceFilter} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={onPriceClick}
                                                      active={priceActive.asc}>{priceConstants.asc}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={onPriceClick}
                                                      active={priceActive.desc}>{priceConstants.desc}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={onPriceClick}
                                                      active={priceActive.default}>{priceConstants.default}</NavDropdown.Item>
                                </NavDropdown>
                            </FilterBlock>

                            <FilterBlock>
                                <NavFilterItemStyle>Year:</NavFilterItemStyle>
                                <NavDropdown title={filter.yearFilter} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={onYearClick}
                                                      active={yearActive.asc}>{yearConstants.asc}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={onYearClick}
                                                      active={yearActive.desc}>{yearConstants.desc}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={onYearClick}
                                                      active={yearActive.default}>{yearConstants.default}</NavDropdown.Item>
                                </NavDropdown>
                            </FilterBlock>

                        </Nav>
                        <HeaderFilterButtonStyle onClick={onClearClick}
                                                 variant="outline-info">Clear</HeaderFilterButtonStyle>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Filter;