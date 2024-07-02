import { createSlice } from "@reduxjs/toolkit/react";
interface IInitialState {
  content: string;
}
const initialState: IInitialState = {
  content: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setContent: (state, { payload }) => {
      state.content = payload;
    },
  },
});
export const { setContent } = blogSlice.actions;
export default blogSlice.reducer;
