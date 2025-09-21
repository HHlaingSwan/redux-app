import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiData } from "../data";

export const getCartItems = createAsyncThunk("cart/getCartItems", async (_, thunkAPI) => {
    try {
        // Simulating an API call with a 1.5-second delay
        return new Promise((resolve) => {
            setTimeout(() => resolve(apiData), 1500);
        });
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong");
    }
});

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1
        },
        TotalItems: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected, (state) => {
                state.isLoading = false;
            });
    }
})
export const { clearCart, removeItem, increase, decrease, TotalItems } = cartSlice.actions;
export default cartSlice.reducer;
