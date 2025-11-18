// rentalsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Create rental
export const createRental = createAsyncThunk(
  "rentals/createRental",
  async (rentalData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/rentals", rentalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create rental");
    }
  }
);

// Fetch all rentals for user
export const fetchUserRentals = createAsyncThunk(
  "rentals/fetchUserRentals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/rentals/client/1");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch rentals");
    }
  }
);

const rentalsSlice = createSlice({
  name: "rentals",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // createRental
    builder
      .addCase(createRental.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createRental.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchUserRentals
    builder
      .addCase(fetchUserRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = rentalsSlice.actions;
export default rentalsSlice.reducer;
