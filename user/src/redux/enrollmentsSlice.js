import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: null,
};
const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollment: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, action) => {
      const newEnrollment = action.payload;
      if (!state.enrollments) {
        state.enrollments = [];
      }
      state.enrollments.push(newEnrollment);
    },
    deleteAllEnrollments: (state, action) => {
      state.enrollments = null;
    },
  },
});
export const { setEnrollment, addEnrollment, deleteAllEnrollments } =
  enrollmentSlice.actions;
export default enrollmentSlice.reducer;
