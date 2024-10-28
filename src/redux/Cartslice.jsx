import { createSlice } from "@reduxjs/toolkit";

const initialState =  JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload)
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id != action.payload.id);
        },
        increaseQnty: (state, action) => {
            state = state.map((item) => {
                if (item.id === action.payload) {
                    item.quantity++
                }
            })
        },
        decreaseQnty: (state,action) => {
            state=state.map((item)=>{
                if (item.quantity !== 1) {
                    if (item.id === action.payload) {
                        item.quantity--
                    }
                }
            })
        },
        ClearCart: (state)=>{
            return [];
        }
    }
})


export const {addToCart , removeFromCart,increaseQnty,decreaseQnty,ClearCart} = cartSlice.actions
export default cartSlice.reducer