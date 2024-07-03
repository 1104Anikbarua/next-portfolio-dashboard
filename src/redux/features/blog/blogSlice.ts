import { createSlice } from "@reduxjs/toolkit/react";
interface IInitialState {
  content: string;
  launch: boolean;
  isModalOpen: boolean;
}
const initialState: IInitialState = {
  content: "",
  launch: false,
  isModalOpen: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setContent: (state, { payload }) => {
      state.content = payload;
    },
    setLaunch: (state, { payload }) => {
      state.launch = payload;
    },
    setIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
});
export const { setContent, setLaunch, setIsModalOpen } = blogSlice.actions;
export default blogSlice.reducer;
