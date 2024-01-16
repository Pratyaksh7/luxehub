import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productInfo: {},
  loading: false,
  error: false,
  categories: [],
};

//Products Actions
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await fetch(`http://localhost:5000/products`, {
    method: "GET",
  });
  return await response.json();
});

export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      method: "GET",
    });
    return await response.json();
  }
);

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (id) => {
    const response = await fetch(`http://localhost:5000/products/categories`, {
      method: "GET",
    });
    return await response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,

  extraReducers: (builder) => {
    /* Fetch Products starts here */
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.data;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /* Fetch Products ends here */

    /* Fetch Product starts here */
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.productInfo = action.payload.data;
      if (action.payload.status === "error") {
        state.error = true;
        state.message = action.payload.message;
      }
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    /* Fetch Product ends here */

    /* Fetch Categories starts here */
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
      state.message = action.payload.message;
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });
    /* Fetch Categories ends here */
  },
});

export default productsSlice.reducer;
