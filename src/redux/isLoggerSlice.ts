import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventProps } from "../Types/types";

interface UserProps {
  user: {
    cellPhone: string;
    email: string;
    isAdmin: boolean;
    name: string;
    password: string;
    events: Array<EventProps>;
  };
}

const initialState: UserProps = {
  user: {
    cellPhone: "",
    email: "",
    isAdmin: false,
    name: "",
    password: "",
    events: [],
  },
};

const isLoggerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggerSlice(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export const { setIsLoggerSlice } = isLoggerSlice.actions;

export default isLoggerSlice.reducer;
