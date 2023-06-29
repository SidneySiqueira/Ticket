import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InfoProps, UsersProps } from "../Types/types";
import axios from "axios";

interface ApiProps {
  users: UsersProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface Props {
  item: string;
  patchData: InfoProps;
}

const initialState: ApiProps = {
  users: [],
  status: "idle",
  error: null,
};

const url = "https://loggers-4c2fe-default-rtdb.firebaseio.com";

export const fetchApi = createAsyncThunk("api/fetch", async () => {
  const response = await axios.get(`${url}/user.json`);
  return response.data;
});

export const AddApi = createAsyncThunk("api/post", async (postData: InfoProps) => {
  const response = await axios.post(`${url}/user.json`, postData);
  return response.data;
});

export const updateApi = createAsyncThunk(
  "api/update",
  async ({ item, patchData }: Props, { getState }) => {
    const response = await axios.patch(`${url}/user/${item}.json`, patchData);
    return response.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      })
      .addCase(AddApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(AddApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export default apiSlice.reducer;
