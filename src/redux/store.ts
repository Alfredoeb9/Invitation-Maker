import React from "react";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./features/userSlice";
import { userApi } from "./api/userAPI";
import { invitationsApi } from "./api/invitationAPI";

const persistAuthConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineSlices(userSlice, userApi, invitationsApi);

const persistedReducer = persistReducer(persistAuthConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const initialState = {};

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(userApi.middleware, invitationsApi.middleware),
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(userApi.middleware),
  });
  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch);

  return store;
};

export const store = makeStore();

export type AppStore = typeof store;

export type AppDispatch = AppStore["dispatch"];
