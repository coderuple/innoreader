import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
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
import { RefreshCcw } from "lucide-react";
import { config } from "../../config";

const DEFAULT_SOURCES: NewsSource[] = config.sources as NewsSource[];

const categories: Category[] = config.categories as Category[];

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

  const [loadedSources, setLoadedSources] = useState<NewsSource[]>([
    ...DEFAULT_SOURCES,
    ...savedPreferences.preferredSources,
  ]);

  const filteredApiSources = useMemo(() => {
    return apiSources.filter(
      (source) =>
        !savedPreferences.preferredSources.some((s) => s.id === source.id)
    );
  }, [apiSources, savedPreferences.preferredSources]);

  useEffect(() => {
    if (filteredApiSources.length > 0) {
      const initialSources = filteredApiSources.slice(0, CHUNK_SIZE);
      setLoadedSources(() => {
        const defaultAndPreferred = [
          ...DEFAULT_SOURCES,
          ...savedPreferences.preferredSources,
        ];
        const uniqueSources = [
          ...new Map(
            [...defaultAndPreferred, ...initialSources].map((item) => [
              item.id,
              item,
            ])
          ).values(),
        ];
        return uniqueSources;
      });
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
                    {filteredApiSources.length > 0 && (
                      <SelectionCard
                        icon={
                          <RefreshCcw
                            className="selection-card__icon"
                            size={24}
                          />
                        }
                        key="load-more"
                        title="Load More Sources"
                        isSelected={true}
                        onClick={() => getNextSourcesChunk()}
                      />
                    )}
                  </div>
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
