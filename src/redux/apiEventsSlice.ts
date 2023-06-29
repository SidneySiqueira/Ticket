import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EventProps, EventsProps } from "../Types/types";

interface ApiEventProps {
  events: EventsProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface Props {
  item: string,
  patchData: EventsProps
}

const initialState: ApiEventProps = {
  events: [],
  status: "idle",
  error: null,
};

const url = "https://eventos-196c1-default-rtdb.firebaseio.com"

export const fetchApiEvent = createAsyncThunk("apiEvent/fetch", async () => {
  const response = await axios.get(`${url}/events.json`);  
  return response.data;
});

export const AddApiEvent = createAsyncThunk("apiEvent/post", async (postData: EventsProps) => { 
  const response = await axios.post(`${url}/events.json`, postData);      
  return response.data;
});

export const updateApiEvent = createAsyncThunk("apiEvent/update", async ({ item, patchData }:Props, { getState }) => { 
  const response = await axios.patch(`${url}/events/${item}.json`, patchData);  
  return response.data;
});

export const deleteApiEvent = createAsyncThunk("apiEvent/delete", async (itemId: string) => {
  const response = await axios.delete(`${url}/events/${itemId}.json`);        
  return itemId;
});

const apiEventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApiEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchApiEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      })
      .addCase(AddApiEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddApiEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(AddApiEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      })
      .addCase(updateApiEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateApiEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = Object.values(action.payload);
        const index = state.events.findIndex((event) => (event as unknown as EventProps).name === action.payload.name);
        state.events[index] = action.payload;
      })
      .addCase(updateApiEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      })
      .addCase(deleteApiEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteApiEvent.fulfilled, (state, action) => {        
        state.status = "succeeded";
        const eventsArray = Object.values(action.payload);
        if (Array.isArray(state.events)) {
          state.events = state.events.filter((event) => {
            return !eventsArray.some((deletedEvents) => (deletedEvents as unknown as EventProps).name === (event as unknown as EventProps).name);
          });
        }
      })
      .addCase(deleteApiEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export default apiEventsSlice.reducer;