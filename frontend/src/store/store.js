import { configureStore } from "@reduxjs/toolkit";
import { deckApi } from "./api/deckApi";

import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    [deckApi.reducerPath] : deckApi.reducer
  },
  // roba di redux vvvvv
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deckApi.middleware),
});

export default store;
