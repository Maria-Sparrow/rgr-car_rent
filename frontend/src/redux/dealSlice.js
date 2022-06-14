import {createSlice} from "@reduxjs/toolkit";
import {getCarById} from "../api/api";

export const dealSlice = createSlice({
    name: "dealReducer",
    initialState: {
        dealItems: [],
        totalPrice: 0,
    },
    reducers: {
        incrementQuantity: (store, action) => {
            store.dealItems = store.dealItems.map((item) => {
                if (item.id === action.payload) {
                    item.quantity += 1;
                }
                return item;
            });
            store.totalPrice = countTotalPrice(store);
        },
        decrementQuantity: (store, action) => {
            store.dealItems = store.dealItems.map((item) => {
                if (item.id === action.payload) {
                    item.quantity -= 1;
                }
                return item;
            });
            store.totalPrice = countTotalPrice(store);
        },
        deleteItemFromDeal: (store, action) => {
            store.dealItems = store.dealItems.filter(item => {
                return item.id !== action.payload;
            });
            store.totalPrice = countTotalPrice(store);
        },
        addToDeal: (store, action) => {
            let addToArray = true;
            store.dealItems.forEach(item => {
                if (item.id === action.payload.id) {
                    item.quantity += 1;
                    addToArray = false;
                }
            })
            if (addToArray) {store.dealItems.push({...action.payload, quantity: 1});}
            store.totalPrice = countTotalPrice(store);
        },
        clearDealItems: (store, action) => {
            store.dealItems = [];
            store.totalPrice = countTotalPrice(store);
        }
    }
});

// function countTotalPrice(store) {
//     let totalPrice = 0;
//     store.dealItems.forEach((item) => {
//         totalPrice += item.quantity * item.price_in_USD
//     })
//     return totalPrice;
// }

function countTotalPrice(store) {
    let totalPrice = 0;
    store.dealItems.forEach((item) => {
        totalPrice += item.quantity * item.price_per_hour
    })
    return totalPrice;
}
export default dealSlice.reducer

const {incrementQuantity, decrementQuantity, deleteItemFromDeal, clearDealItems, addToDeal} = dealSlice.actions;
export {incrementQuantity, decrementQuantity, deleteItemFromDeal, clearDealItems}

export const getTotalPrice = (store) => store.dealReducer.totalPrice;
export const getDealItems = (store) => store.dealReducer.dealItems;

export const addToDealAsync = (id) => (dispatch) => {
    getCarById(id).then(item => {
        dispatch(addToDeal(item))
        alert(item.title + " was added to deal.");
    })
};