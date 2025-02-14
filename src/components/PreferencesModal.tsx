import { useState } from "react";
import { useDispatch } from "react-redux";
import { Save, X } from "lucide-react";
import { Category, NewsSource, SearchKey } from "../types/";
import {
  setPreferredSources,
  setPreferredCategories,
  completePreferencesSetup,
} from "../features/preferences/slice";

const sources: { id: string; label: string; searchKey: SearchKey }[] = [
  { id: "guardian", label: "The Guardian", searchKey: "guardian-api" },
  { id: "nytimes", label: "New York Times", searchKey: "nyt-api" },
  { id: "newsapi", label: "NewsAPI", searchKey: "news-api" },
];

const categories: { id: string; label: string }[] = [
  { id: "business", label: "Business" },
  { id: "technology", label: "Technology" },
  { id: "sports", label: "Sports" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
  { id: "entertainment", label: "Entertainment" },
];

export function PreferencesModal() {
  const dispatch = useDispatch();
  const [selectedSources, setSelectedSources] = useState<NewsSource[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleSave = () => {
    dispatch(setPreferredSources(selectedSources));
    dispatch(setPreferredCategories(selectedCategories));
    dispatch(completePreferencesSetup());
  };

  const handleClose = () => {
    dispatch(completePreferencesSetup());
  };

  const toggleSource = (source: NewsSource) => {
    setSelectedSources((prev) =>
      prev.some((s) => s.id === source.id)
        ? prev.filter((s) => s.id !== source.id)
        : [...prev, source]
    );
  };

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.some((c) => c.id === category.id)
        ? prev.filter((c) => c.id !== category.id)
        : [...prev, category]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Welcome to Innoreader!</h2>
          <button className="modal__close" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal__content">
          <p className="modal__description">
            Customize your news feed by selecting your preferred sources and
            categories. You can always change these later in settings.
          </p>

          <div className="preferences-section">
            <h3 className="preferences-section__title">News Sources</h3>
            <div className="chip-group">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() =>
                    toggleSource({
                      id: source.id,
                      name: source.label,
                      searchKey: source.searchKey,
                    })
                  }
                  className={`chip ${
                    selectedSources.some((s) => s.id === source.id)
                      ? "chip--active"
                      : ""
                  }`}
                >
                  {source.label}
                </button>
              ))}
            </div>
          </div>

          <div className="preferences-section">
            <h3 className="preferences-section__title">Categories</h3>
            <div className="chip-group">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    toggleCategory({
                      id: category.id,
                      label: category.label,
                      searchKey: "news-api",
                    })
                  }
                  className={`chip ${
                    selectedCategories.some((c) => c.id === category.id)
                      ? "chip--active"
                      : ""
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="modal__footer">
          <button
            className="button button--primary"
            onClick={handleSave}
            disabled={
              selectedSources.length === 0 || selectedCategories.length === 0
            }
          >
            <Save size={16} />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
