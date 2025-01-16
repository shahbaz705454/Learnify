import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalQuantity: localStorage.totalQuantity("totalItems") ? JSON.parse(localStorage.totalQuantity("totalItems")) : 0,
    totalAmount: localStorage.totalAmount("totalItems") ? JSON.parse(localStorage.totalAmount("totalItems")) : 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState:initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            state.totalAmount += newItem.price;
            toast.success("Item Added successfully")
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalAmount -= existingItem.price;
            toast.error("Removed Cart Item");
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;