import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./redux/userSlice.js";
import enrollmentReducer from "./redux/enrollmentsSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
    enrollments: enrollmentReducer,
  },
});
