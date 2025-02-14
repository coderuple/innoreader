import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsSource } from "../../types";

const initialState: NewsSource[] = [];
const sourcesSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<NewsSource[]>) => {
      return (state = action.payload);
    },
    addSource: (state, action: PayloadAction<NewsSource>) => {
      const exists = state.some(
        (source) =>
          source.id === action.payload.id &&
          source.searchKey === action.payload.searchKey
      );
      if (!exists) {
        return [...state, action.payload];
      }
      return state;
    },
    removeSource: (state, action: PayloadAction<string>) => {
      return state.filter((source) => source.id !== action.payload);
    },
  },
});

export const { setSources, addSource, removeSource } = sourcesSlice.actions;
export default sourcesSlice.reducer;
