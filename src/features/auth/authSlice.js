import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {},
  message: "",
  error: false,
  loading: false,
  token: null,
  rqstStatus: ""
};

export const signup = createAsyncThunk("signup", async (values) => {
  const response = await fetch(`http://localhost:5000/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
  return await response.json();
});

export const signin = createAsyncThunk("signin", async (values) => {
  const response = await fetch(`http://localhost:5000/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
  return await response.json();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthdata: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    }
  },

  /// reducer call here
  extraReducers: (builder) => {
    //signup cases
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      if(action.payload.status == "error"){
        state.error = true
        state.rqstStatus = "error"
      }else{
        state.rqstStatus = "ok"
      }
      state.message = action.payload.message;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    // signin cases
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      if(action.payload.status == "error"){
        state.error = true
        state.rqstStatus = "error"
      }else{
        state.rqstStatus = "ok"
        state.userData = action.payload.data
        state.token = action.payload.data.token
      }
      state.message = action.payload.message;
    });

    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });
  },
});

export const {setAuthdata} = authSlice.actions;

export default authSlice.reducer;
