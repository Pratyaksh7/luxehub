import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: {},
  cartTotalPrice: null,
  wishlistData: {},
  error: false,
  loading: false,
  message: "",
  rqstStatus: "",
};

export const addtocart = createAsyncThunk(
  "addtocart",
  async ({ userId, productId, quantity }) => {
    const response = await fetch(
      `http://localhost:5000/carts/${userId}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      }
    );
    return await response.json();
  }
);

export const addToWishlist = createAsyncThunk(
  "addToWishlist",
  async ({ userId, productId, productName, quantity, price }) => {
    const response = await fetch(
      `http://localhost:5000/carts/${userId}/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, productName, quantity, price }),
      }
    );
    return await response.json();
  }
);

export const fetchCartItems = createAsyncThunk(
  "fetchCartItems",
  async (userId) => {
    const response = await fetch(`http://localhost:5000/carts/${userId}`, {
      method: "GET",
    });
    return await response.json();
  }
);

export const fetchWishlistItems = createAsyncThunk(
  "fetchWishlistItems",
  async (userId) => {
    const response = await fetch(
      `http://localhost:5000/carts/${userId}/wishlist`,
      {
        method: "GET",
      }
    );

    return await response.json();
  }
);

export const deleteFromWishlist = createAsyncThunk(
  "deleteFromWishlist",
  async ({ userId, productId }) => {
    const response = await fetch(
      `http://localhost:5000/carts/${userId}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  }
);

export const updateItemQtyInCart = createAsyncThunk(
  "updateItemQtyInCart",
  async ({ userId, productData }) => {
    const response = await fetch(
      `http://localhost:5000/carts/${userId}/items`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    return await response.json();
  }
);

export const fetchCartTotalPrice = createAsyncThunk(
  "fetchCartTotalPrice",
  async (userId) => {
    const response = await fetch(
      `http://localhost:5000/carts/${userId}/total`,
      {
        method: "GET",
      }
    );

    return await response.json();
  }
);

export const deleteFromCart = createAsyncThunk(
  "deleteFromCart",
  async ({ userId, productId }) => {
    const response = await fetch(
      `http://localhost:5000/carts/${userId}/items/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  }
);

export const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    updateCartItemQuantity: (state, action) => {
      const { userId, productId, quantity } = action.payload;
      state.cartData = state.cartData.map((item) => {
        if (item?._id === productId) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addtocart.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(addtocart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartData = action.payload.data;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(addtocart.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(fetchCartItems.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.cartData = action.payload.data;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(addToWishlist.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(fetchWishlistItems.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchWishlistItems.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlistData = action.payload.data;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(fetchWishlistItems.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(deleteFromWishlist.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(deleteFromWishlist.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(deleteFromWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(updateItemQtyInCart.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(updateItemQtyInCart.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(updateItemQtyInCart.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(fetchCartTotalPrice.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchCartTotalPrice.fulfilled, (state, action) => {
      state.loading = false;
      state.cartTotalPrice = action.payload.data;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(fetchCartTotalPrice.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(deleteFromCart.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status == "error") {
        state.error = true;
        state.rqstStatus = "error";
      } else {
        state.rqstStatus = "ok";
      }

      state.message = action.payload.message;
    });

    builder.addCase(deleteFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });
  },
});

export const { updateCartItemQuantity } = cartsSlice.actions;

export default cartsSlice.reducer;
