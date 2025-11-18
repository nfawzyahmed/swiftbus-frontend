import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchBuses = createAsyncThunk(
  "buses/fetchBuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/buses");
      return response.data; // list of buses
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load buses");
    }
  }
);

const busesSlice = createSlice({
  name: "buses",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default busesSlice.reducer;
