import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourses: (state, action) => {
      const newCourse = action.payload;
      if (!state.courses) {
        state.courses = [];
      }
      state.courses.push(newCourse);
    },
    removeAllCourses: (state, action) => {
      state.courses = null;
    },
    deleteCourse: (state, action) => {
      const courseIdToDelete = action.payload;
      state.courses = state.courses.filter(
        (course) => course.id !== courseIdToDelete
      );
    },
  },
});
export const { setCourses, addCourses, removeAllCourses, deleteCourse } =
  courseSlice.actions;
export default courseSlice.reducer;
