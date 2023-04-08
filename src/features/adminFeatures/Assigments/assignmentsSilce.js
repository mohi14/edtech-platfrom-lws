import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editing: undefined,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    selectEditing: (state, action) => {
      state.editing = action.payload;
    },
  },
});

export default assignmentSlice.reducer;
export const { selectEditing } = assignmentSlice.actions;
