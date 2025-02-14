import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { newsApi } from "../features/articles/newsApi";
import { guardianApi } from "../features/articles/guardianApi";
import { nytApi } from "../features/articles/nytApi";
import filterReducer from "../features/filter/slice";
import sourcesReducer from "../features/sources/slice";
import preferencesReducer from "../features/preferences/slice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [guardianApi.reducerPath]: guardianApi.reducer,
    [nytApi.reducerPath]: nytApi.reducer,
    sources: sourcesReducer,
    filters: filterReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(newsApi.middleware, guardianApi.middleware, nytApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
