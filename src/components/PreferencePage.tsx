import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Category, NewsSource } from "../types";
import {
  setPreferredSources,
  setPreferredCategories,
  completePreferencesSetup,
} from "../features/preferences/slice";
import { RootState } from "../store";
import { SelectionCard } from "./SelectionCard";
import { useGetNewsSourcesQuery } from "../features/articles/newsApi";
import { NewsApiSource } from "./NewsApiSource";
import { useAppDispatch } from "../hooks";

// const sources: NewsSource[] = [
//   {
//     id: "guardian",
//     name: "The Guardian",
//     imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
//     searchKey: "guardian-api",
//   },
//   {
//     id: "nytimes",
//     name: "New York Times",
//     imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
//     searchKey: "nyt-api",
//   },
// ];

const DEFAULT_SOURCES: NewsSource[] = [
  {
    id: "guardian",
    name: "The Guardian",
    imageUrl: "/assets/guardian.jpeg",
    searchKey: "guardian-api",
  },
  {
    id: "nytimes",
    name: "New York Times",
    imageUrl: "/assets/nyt.jpg",
    searchKey: "nyt-api",
  },
];

const categories: Category[] = [
  {
    id: "business",
    label: "Business",
    searchKey: "news-api",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    id: "technology",
    label: "Technology",
    searchKey: "news-api",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: "sports",
    label: "Sports",
    searchKey: "news-api",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
  },
  {
    id: "science",
    label: "Science",
    searchKey: "news-api",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
  },
  {
    id: "health",
    label: "Health",
    searchKey: "news-api",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    searchKey: "news-api",
    imageUrl: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852",
  },
];

export function PreferencesPage() {
  const dispatch = useAppDispatch();
  const [preferencesSaved, setPreferencesSaved] = useState(false);
  const savedPreferences = useSelector((state: RootState) => state.preferences);

  const { data: apiSources = [], isLoading: isLoadingSources } =
    useGetNewsSourcesQuery();

  //   const allSources = useMemo(() => {
  //     return [...DEFAULT_SOURCES, ...apiSources];
  //   }, [apiSources]);

  const [selectedSources, setSelectedSources] = useState<NewsSource[]>(
    savedPreferences.preferredSources
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    savedPreferences.preferredCategories
  );

  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const CHUNK_SIZE = 10;

  const [loadedSources, setLoadedSources] =
    useState<NewsSource[]>(DEFAULT_SOURCES);

  const filteredApiSources = useMemo(() => {
    return apiSources.filter(
      (source) =>
        !savedPreferences.preferredSources.some((s) => s.id === source.id)
    );
  }, [apiSources, savedPreferences.preferredSources]);

  useEffect(() => {
    if (filteredApiSources.length > 0) {
      const initialSources = filteredApiSources.slice(0, CHUNK_SIZE);
      setLoadedSources(() => [
        ...savedPreferences.preferredSources,
        ...initialSources,
      ]);
      setCurrentChunkIndex(1);
    }
  }, [filteredApiSources, savedPreferences.preferredSources]);

  const getNextSourcesChunk = () => {
    const startIndex = currentChunkIndex * CHUNK_SIZE;
    const chunk = filteredApiSources.slice(startIndex, startIndex + CHUNK_SIZE);

    if (chunk.length === 0) {
      setCurrentChunkIndex(0);
      return;
    }

    setCurrentChunkIndex((prev) => prev + 1);
    setLoadedSources((prev) => [...prev, ...chunk]);
  };

  const handleSave = () => {
    setPreferencesSaved(true);
    dispatch(setPreferredSources(selectedSources));
    dispatch(setPreferredCategories(selectedCategories));
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

  const buttonText = useMemo(() => {
    if (preferencesSaved) {
      return savedPreferences.preferredSources.length > 0 ||
        savedPreferences.preferredCategories.length > 0
        ? "Preferences Updated"
        : "Preferences Saved";
    }
    return savedPreferences.preferredSources.length > 0 ||
      savedPreferences.preferredCategories.length > 0
      ? "Update Preferences"
      : "Save Preferences";
  }, [preferencesSaved, savedPreferences]);

  return (
    <div className="preferences-page">
      <div className="preferences-container">
        <div className="preferences-content">
          <h1 className="preferences-title">Customize Your News Feed</h1>
          <p className="preferences-description">
            Select your preferred news sources and categories to personalize
            your news feed.
          </p>

          <div className="preferences-sections">
            <section className="preferences-section">
              <h2 className="section-title">News Sources</h2>
              {isLoadingSources ? (
                <div>Loading Sources...</div>
              ) : (
                <>
                  <div className="selection-grid">
                    {loadedSources.map((source) =>
                      source.searchKey === "news-api" ? (
                        <NewsApiSource
                          key={source.id}
                          source={source}
                          isSelected={selectedSources.some(
                            (s) => s.id === source.id
                          )}
                          onClick={() => toggleSource(source)}
                        />
                      ) : (
                        <SelectionCard
                          key={source.id}
                          title={source.name}
                          imageUrl={source.imageUrl}
                          isSelected={selectedSources.some(
                            (s) => s.id === source.id
                          )}
                          onClick={() => toggleSource(source)}
                        />
                      )
                    )}
                  </div>
                  <button
                    className="chunk-button"
                    onClick={getNextSourcesChunk}
                  >
                    Load More Sources
                  </button>
                </>
              )}
            </section>

            <section className="preferences-section">
              <h2 className="section-title">Categories</h2>
              <div className="selection-grid">
                {categories.map((category) => (
                  <SelectionCard
                    key={category.id}
                    title={category.label}
                    imageUrl={category.imageUrl || ""}
                    isSelected={selectedCategories.some(
                      (c) => c.id === category.id
                    )}
                    onClick={() => toggleCategory(category)}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="preferences-footer">
            <button
              className="save-button"
              onClick={handleSave}
              disabled={
                selectedSources.length === 0 || selectedCategories.length === 0
              }
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
