import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryOption,
  NewsFilters,
  NewsSource,
  NewsSourceOption,
} from "../../types";

const initialState: NewsFilters = {
  sources: [],
  categories: [
    // {
    //   id: "business",
    //   label: "Business",
    //   searchKey: "news-api",
    // },
    // {
    //   id: "technology",
    //   label: "Technology",
    //   searchKey: "news-api",
    // },
    // {
    //   id: "sports",
    //   label: "Sports",
    //   searchKey: "news-api",
    // },
    // {
    //   id: "science",
    //   label: "Science",
    //   searchKey: "news-api",
    // },
    // {
    //   id: "health",
    //   label: "Health",
    //   searchKey: "news-api",
    // },
    // {
    //   id: "entertainment",
    //   label: "Entertainment",
    //   searchKey: "news-api",
    // },
  ],

  searchQuery: "",
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSources: (state, action: PayloadAction<NewsSource[]>) => {
      state.sources = action.payload;
    },
    clearSources: (state) => {
      state.sources = [];
    },
    clearCategories: (state) => {
      state.categories = [];
    },
    resetFilters: (state) => {
      state.sources = [];
      state.categories = initialState.categories;
      state.searchQuery = "";
      state.dateFrom = initialState.dateFrom;
      state.dateTo = initialState.dateTo;
    },
    addSource: (state, action: PayloadAction<NewsSource>) => {
      state.sources.push(action.payload);
    },
    addCategory: (state, action: PayloadAction<CategoryOption>) => {
      if (
        !state.categories.find((category) => category.id === action.payload.id)
      ) {
        state.categories.push(action.payload);
      }
    },
    toggleSource: (state, action: PayloadAction<NewsSourceOption>) => {
      const index = state.sources.findIndex(
        (source) => source.id === action.payload.id
      );
      if (index === -1) {
        state.sources.push(action.payload);
      } else {
        state.sources[index].selected = !state.sources[index].selected;
      }
    },
    toggleCategory: (state, action: PayloadAction<CategoryOption>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index === -1) {
        state.categories.push({
          id: action.payload.id,
          label: action.payload.label,
          selected: true,
          searchKey: action.payload.searchKey,
        });
      } else {
        state.categories[index].selected = !state.categories[index].selected;
      }
    },
    setDateRange: (
      state,
      action: PayloadAction<{ from?: string; to?: string }>
    ) => {
      state.dateFrom = action.payload.from;
      state.dateTo = action.payload.to;
    },
  },
});

export const {
  setSearchQuery,
  toggleSource,
  toggleCategory,
  setDateRange,
  setSources,
  addSource,
  addCategory,
} = filtersSlice.actions;
export default filtersSlice.reducer;
