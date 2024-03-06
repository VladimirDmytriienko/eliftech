import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shop: 'Pill Palace',
    value: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const index = state.value.findIndex((item) => item.name === product.name);
            if (index !== -1) {
                state.value[index].quantity++;
            } else {
                state.value.push({ ...product, quantity: 1 });
            }
        },
        increaseQuantity: (state, action) => {
            const product = action.payload;
            const index = state.value.findIndex((item) => item.name === product.name);
            state.value[index].quantity++
        },
        decreaseQuantity: (state, action) => {
            const product = action.payload;
            const index = state.value.findIndex((item) => item.name === product.name);
            if (state.value[index].quantity > 0) { 
                state.value[index].quantity--;
            }
        },
        clearCart: (state, action) => {
            state.value = []
        },
        updateShop: (state, action) => {
            state.shop = action.payload;
        }

    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, clearCart, updateShop } = cartSlice.actions;

export default cartSlice.reducer;