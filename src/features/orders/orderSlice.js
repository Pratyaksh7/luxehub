import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: {},
  error: false,
  loading: false,
  message: "",
  rqstStatus: "",
};

export const placeOrder = createAsyncThunk(
  "placeOrder",
  async ({ userId, orderDetails }) => {
    const response = await fetch(
      `http://localhost:5000/orders/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      }
    );
    return await response.json();
  }
);


export const ordersSlice = createSlice({
  name: "orders",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action.payload.data;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

  },
});

export default ordersSlice.reducer;
