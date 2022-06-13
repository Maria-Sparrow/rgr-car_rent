import React from 'react';
import {Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {HeaderFilterButtonStyle, HeaderLogOutButtonStyle} from "../styles/General.styled"
import logo from "../images/logo_new.jpg";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAccess} from "../redux/accessSlice";


function Header({search, cars, setCarsToShow}) {

    const dispatch = useDispatch();

    function logOut() {
        localStorage.clear();
        dispatch(setAccess(false));
    }

    const searchItems = () => {
        let carsToShow = []
        const inputString = document.getElementById('searchInput').value.toLowerCase();

        carsToShow = cars.filter(car => {
            const title = car.title.toLowerCase().includes(inputString);
            const area = car.area_in_square_meters.toString().toLowerCase().includes(inputString);
            const price = car.price_in_USD.toString().toLowerCase().includes(inputString);
            const location = car.location.toLowerCase().includes(inputString);
            const floors = car.floors_count.toString().toLowerCase().includes(inputString);
            return title || area || price || location || floors;
        });
        setCarsToShow([...carsToShow]);
    }

    return (
        <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        height="50"
                        width="50"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Link to="/">
                            <Nav.Link href="/" as="span"> Home </Nav.Link>
                        </Link> */}
                        <Link to="catalog">
                            <Nav.Link href="/catalog" as="span"> Catalog </Nav.Link>
                        </Link>
                        <Link to="deal">
                            <Nav.Link href="/deal" as="span"> Deals </Nav.Link>
                        </Link>
                        <HeaderLogOutButtonStyle onClick={logOut}
                                                 variant="outline-info">Log Out</HeaderLogOutButtonStyle>
                    </Nav>
                    {/* {search &&
                    <Form inline>
                        <FormControl onChange={searchItems}
                                     id="searchInput"
                                     type="text"
                                     placeholder="Search"
                                     className="mr-sm-2"
                        />
                        <HeaderFilterButtonStyle onClick={searchItems}
                                                 variant="outline-info">Search</HeaderFilterButtonStyle>
                    </Form>
                    } */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;