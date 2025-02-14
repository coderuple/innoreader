import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, NewsSource } from "../../types/";

interface PreferencesState {
  preferredSources: NewsSource[];
  preferredCategories: Category[];
  hasSetPreferences: boolean;
}

const STORAGE_KEY = "innoreader_preferences";

const loadInitialState = (): PreferencesState => {
  try {
    const savedPreferences = localStorage.getItem(STORAGE_KEY);
    if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences);
      return {
        preferredSources: parsed.preferredSources || [],
        preferredCategories: parsed.preferredCategories || [],
        hasSetPreferences: parsed.hasSetPreferences || false,
      };
    }
  } catch {
    // console.error("Error loading preferences from localStorage:", error);
  }

  return {
    preferredSources: [],
    preferredCategories: [],
    hasSetPreferences: false,
  };
};

const initialState: PreferencesState = loadInitialState();

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferredSources: (state, action: PayloadAction<NewsSource[]>) => {
      state.preferredSources = action.payload;
    },
    setPreferredCategories: (state, action: PayloadAction<Category[]>) => {
      state.preferredCategories = action.payload;
    },
    completePreferencesSetup: (state) => {
      state.hasSetPreferences = true;
    },
    resetPreferences: (state) => {
      state.preferredSources = [];
      state.preferredCategories = [];
      state.hasSetPreferences = false;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error("Error removing preferences from localStorage:", error);
      }
    },
  },
});

export const {
  setPreferredSources,
  setPreferredCategories,
  completePreferencesSetup,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
