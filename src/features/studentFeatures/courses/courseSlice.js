import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course: undefined,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        activeCourse: (state, action) => {
            state.course = action.payload;
        },
    },
});

export default courseSlice.reducer;
export const { activeCourse } = courseSlice.actions;