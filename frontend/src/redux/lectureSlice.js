import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lectures: null,
};

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    setLectures: (state, action) => {
      state.lectures = action.payload;
    },
    addLectures: (state, action) => {
      const newLecture = action.payload;
      if (!state.lectures) {
        state.lectures = [];
      }
      state.lectures.push(newLecture);
    },
    removeAllLectures: (state, action) => {
      state.lectures = null;
    },
    deleteLecture: (state, action) => {
      const lectureIdToDelete = action.payload;
      state.lectures = state.lectures.filter(
        (lecture) => lecture.id !== lectureIdToDelete
      );
    },
  },
});
export const { setLectures, addLectures, removeAllLectures, deleteLecture } =
  lectureSlice.actions;
export default lectureSlice.reducer;
