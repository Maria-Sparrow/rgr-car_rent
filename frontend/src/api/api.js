import axios from "axios";


const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
});

export async function getCars() {
    // await delay(500);
    return (await instance.get('/car')).data;
}

export async function getCarById(id) {
    // await delay(500);
    return (await instance.get(`/car/${id}`)).data;
}

export async function getFilteredCars(price, area, floors) {
    // await delay(500);
    return (await instance.get(`/car/filter?price=${price}&year=${area}&floors=${floors}`)).data;
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


export async function loginUser(username, password) {
    // await delay(3000);
    return (await instance.post(`/user/login`, {username: username, password: password})).data;
}

export async function registerUser(username, real_name, phone, password) {
    // await delay(3000);
    return (await instance.post(`/user/register`, {username: username, real_name: real_name,
        phone:phone, password: password})).data;
}

export async function didUserLogin(loggedInValue) {
    // await delay(500);
    return (await instance.post(`/user/check_logged_in`, {loggedInValue: loggedInValue})).data;
}



export async function registerDeal(carId, price, rent_time, collateral_amount) {
    // await delay(3000);
    return (await instance.post(`/deal/register`, {car_id:carId, price: price,
        rent_time:rent_time, collateral_amount: collateral_amount })).data;
}

export async function getDeals() {
    // await delay(500);
    return (await instance.get('/deal')).data;
}

export async function getDealData() {
    // await delay(500);
    return (await instance.get('/deal')).data;
}

export async function updateDeal(id, deal) {
    return (await instance.put(`/deal/${id}`, deal)).data;
}

