import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ------------- All interfaces are below here --------------------
interface AuthState {
  userData: {};
  message: string;
  error: boolean;
  loading: boolean;
  token: string | null;
  rqstStatus: string;
}

interface SignupPayload {
  status: string;
  message: string;
}

interface SigninPayload {
  data: {
    token: string;
    userData: any;
  }
  status: string;
  message: string;
}


// ------------- All interfaces are above here ---------------------

const initialState: AuthState = {
  userData: {},
  message: "",
  error: false,
  loading: false,
  token: null,
  rqstStatus: ""
};

export const signup = createAsyncThunk<SignupPayload, { values: any }>("signup", async (values) => {
  const response = await fetch(`http://localhost:5000/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
  return await response.json();
});

export const signin = createAsyncThunk<SigninPayload, { values: any}>("signin", async (values) => {
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
    setAuthdata: (state, action: PayloadAction<{ token: string; userData: any }>) => {
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
      if (action.payload.status == "error") {
        state.error = true
        state.rqstStatus = "error"
      } else {
        state.rqstStatus = "ok"
      }
      state.message = action.payload.message;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      // state.message = action.payload.message;
    });

    // signin cases
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status == "error") {
        state.error = true
        state.rqstStatus = "error"
      } else {
        state.rqstStatus = "ok"
        state.userData = action.payload.data
        state.token = action.payload.data.token
      }
      state.message = action.payload.message;
    });

    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      // state.message = action.payload.message;
    });
  },
});

export const { setAuthdata } = authSlice.actions;

export default authSlice.reducer;
