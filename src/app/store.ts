import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import movieSlice from '../features/movies/movieSlice';

// `combineSlices` is used to automatically combine reducers
const rootReducer = combineReducers({

  // other reducers

  movies: movieSlice, // Add the movies reducer here

});;

// Define RootState type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Create a store configuration function
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(),
    preloadedState: {
      movieList: [],
      isLoading: false,
      error: null,
      ...preloadedState,
    },
  });

  // Set up listeners for refetchOnFocus/refetchOnReconnect behaviors
  setupListeners(store.dispatch);

  return store;
};

// Create the store instance
export const store = makeStore();

// Define AppStore and AppDispatch types
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

// Define AppThunk type for creating thunk actions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
