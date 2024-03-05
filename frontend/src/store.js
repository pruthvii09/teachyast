import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./redux/userSlice.js";
import courseReducer from "./redux/courseSlice.js";
import lectureReducer from "./redux/lectureSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
    lectures: lectureReducer,
  },
});
