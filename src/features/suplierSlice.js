import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

//get all
export const getSuplier = createAsyncThunk("supliers/getSuplier", async () => {
  const response = await axios.get("http://localhost:8000/api/suplier");
  return response.data.data;
});

// create suplier
export const saveSuplier = createAsyncThunk(
  "supliers/saveSuplier",
  async (formData, { rejectWithValue }) =>
    await axios
      .post("http://localhost:8000/api/suplier/create", formData)
      .then(function (response) {
        return response.data.data;
      })
      .catch(function (error) {
        return rejectWithValue(error.response.data.message);
      })
);

// delete
export const deleteSuplier = createAsyncThunk(
  "supliers/deleteSuplier",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/suplier/${id}`
    );
    console.log(response);
    return id;
  }
);

//update
export const editSuplier = createAsyncThunk(
  "supliers/editSuplier",
  async ({formData,id},{ rejectWithValue }) =>//kalu kirim id dan form data harus di kurung kurawa kusus wdit
    await axios
      .post(`http://localhost:8000/api/suplier/${id}/update`,formData)
      .then(function (response) {
        console.log(response,"response true");
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error,"response FALSE");
        return rejectWithValue(error.response.data.message);
      })
);


const suplierEntity = createEntityAdapter({
  selectId: (suplier) => suplier.id,
});

const suplierSlice = createSlice({
  name: "suplier",
  initialState: suplierEntity.getInitialState(),

  extraReducers: {
    // get index All
    [getSuplier.pending]: (state, action) => {
      state.createStatus = "loading"; //pengganti redirect state dikembalikan ke loading, dan tangkap redirect di create agak redirect
      state.status = "loading";
      state.editStatus = "loading";
    },
    [getSuplier.fulfilled]: (state, action) => {
      suplierEntity.setAll(state, action.payload);
      state.status = "succeeded";
    },
    [getSuplier.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },

    //create
    [saveSuplier.pending]: (state, action) => {
      state.createStatus = "loading";
    },
    [saveSuplier.rejected]: (state, action) => {
      state.createError = action.payload;
      state.createStatus = "error";
    },
    [saveSuplier.fulfilled]: (state, action) => {
      suplierEntity.addOne(state, action.payload);
      state.createStatus = "succeeded";
    },

    // delete
    [deleteSuplier.fulfilled]: (state, action) => {
      suplierEntity.removeOne(state, action.payload);
    },

    //update
    [editSuplier.pending]: (state, action) => {
      state.editStatus = "loading";
    },
    [editSuplier.rejected]: (state, action) => {
      state.editError = action.payload;
      state.editStatus = "error";
    },
    [editSuplier.fulfilled]: (state, action) => {
      suplierEntity.updateOne(state, action.payload);
      // suplierEntity.updateOne(state, {id:action.payload.id, updates:action.payload});
      state.editStatus = "succeeded";
    },

  },
});

export const suplierSelectors = suplierEntity.getSelectors(
  (state) => state.suplier
);

export default suplierSlice.reducer;
