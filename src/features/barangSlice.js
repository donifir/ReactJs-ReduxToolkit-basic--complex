import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

// barang
export const getBarang = createAsyncThunk("barangs/getBarang", async () => {
  const response = await axios.get("http://localhost:8000/api/barang");
  return response.data.data;
});

// create suplier
export const createBarang = createAsyncThunk(
  "barangs/createSuplier",
  async (formData, { rejectWithValue }) =>
    await axios
      .post("http://localhost:8000/api/barang/create", formData)
      .then(function (response) {
        console.log(response);
        return response.data.data;
      })
      .catch(function (error) {
        return rejectWithValue(error.response.data.message);
      })
);

// create suplier
export const updateBarang = createAsyncThunk(
  "barangs/updateSuplier",
  async ({formData,id}, { rejectWithValue }) =>
    await axios
      .post(`http://localhost:8000/api/barang/${id}/update`, formData)
      .then(function (response) {
        console.log(response);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
        return rejectWithValue(error.response.data.message);
      })
);

// barang
export const deleteBarang = createAsyncThunk("barangs/deleteBarang", async (id) => {
  const response = await axios.delete(`http://localhost:8000/api/barang/${id}`);
  return response.data.data;
});




const barangEntity = createEntityAdapter({
  selectId: (barang) => barang.id,
});

const barangSlice = createSlice({
  name: "barang",
  initialState: barangEntity.getInitialState(),

  extraReducers: {
    //create
    [getBarang.pending]: (state, action) => {
      state.createBarangStatus = "loading";
      state.getBarangStatus = "loading";
      state.updateBarangStatus = "loading";
    },
    [getBarang.fulfilled]: (state, action) => {
      state.getBarangStatus = "succeeded";
      barangEntity.setAll(state, action.payload);
    },
    [getBarang.rejected]: (state, action) => {
      state.getBarangStatus = "error";
      state.getBarangError = action.payload;
    },

    //create
    [createBarang.pending]: (state, action) => {
      state.createBarangStatus = "loading";
    },
    [createBarang.fulfilled]: (state, action) => {
      barangEntity.addOne(state, action.payload);
      state.createBarangStatus = "succeeded";
    },
    [createBarang.rejected]: (state, action) => {
      state.createError = action.payload;
      state.createBarangStatus = "error";
    },

    // udpate
    [updateBarang.pending]: (state, action) => {
      state.updateBarangStatus = "loading";
    },
    [updateBarang.fulfilled]: (state, action) => {
      barangEntity.updateOne(state, action.payload);
      // suplierEntity.updateOne(state, {id:action.payload.id, updates:action.payload}); //edit yang benar kaya gini
      state.updateBarangStatus = "succeeded";
    },
    [updateBarang.rejected]: (state, action) => {
      state.createError = action.payload;
      state.updateBarangStatus = "error";
    },

    // delete
    [deleteBarang.fulfilled]: (state, action) => {
      barangEntity.removeOne(state, action.payload);
      state.updateBarangStatus = "succeeded";
    },

  },
});

export const barangSelectors = barangEntity.getSelectors(
  (state) => state.barang
);

export default barangSlice.reducer;
