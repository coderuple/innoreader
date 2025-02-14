import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const STORAGE_KEY = "innoreader_preferences";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    const actionWithType = action as { type: string };
    console.log("action.type---", actionWithType.type);

    if (
      actionWithType.type.startsWith("preferences/") ||
      actionWithType.type === "@@INIT"
    ) {
      try {
        const state = store.getState() as RootState;
        const preferencesToSave = {
          preferredSources: state.preferences.preferredSources,
          preferredCategories: state.preferences.preferredCategories,
          hasSetPreferences: state.preferences.hasSetPreferences,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferencesToSave));
      } catch (error) {
        console.error("Failed to save preferences to localStorage:", error);
      }
    }

    return result;
  };
