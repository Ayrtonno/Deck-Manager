import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"
import localForage from "localforage";

import { deckApi } from "./api/deckApi";
import { userApi } from "./api/userApi";
// import userReducer from "./userSlice";

const persistConfig = {
  storage: localForage,
  // blacklist: ["userApi/config/middlewareRegistered", "deckApi/config/middlewareRegistered"],
}

const rootReducer = {
  // user: userReducer,
  [deckApi.reducerPath]: persistReducer({ ...persistConfig, key: "deck" }, deckApi.reducer), // deckApi.reducer, // 
  [userApi.reducerPath]: persistReducer({ ...persistConfig, key: "user" }, userApi.reducer), // userApi.reducer, // 
}

/* const persistedReducer = persistReducer(persistConfig, rootReducer)
 */

const store = configureStore({
  reducer: rootReducer,
  // roba di redux vvvvv
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  })
    .concat([deckApi.middleware, userApi.middleware])
});

let persistor = persistStore(store)

export { store, persistor };
