import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"
import localForage from "localforage";

import { deckApi } from "./api/deckApi";
import { userApi } from "./api/userApi";

import userReducer from "./userSlice";

const persistConfig = {
  storage: localForage,
}

const rootReducer = {
  user: userReducer,
  [deckApi.reducerPath] : persistReducer({...persistConfig, key: "deck"}, deckApi.reducer),
  [userApi.reducerPath] : persistReducer({...persistConfig, key: "user"}, userApi.reducer)
}

/* const persistedReducer = persistReducer(persistConfig, rootReducer)
 */

const store = configureStore({
  reducer: rootReducer,
  // roba di redux vvvvv
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deckApi.middleware),
});

let persistor = persistStore(store)

export {store, persistor};
