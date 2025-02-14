import { Calendar, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
// import { Category } from "../types";
import { RootState } from "../store";
import {
  setSearchQuery,
  toggleSource,
  toggleCategory,
  setDateRange,
} from "../features/filter/slice";

import SearchBar from "./SearchBar";
import { useAppDispatch } from "../hooks";
import { useEffect } from "react";

// const categories: { id: Category; label: string }[] = [
//   { id: "business", label: "Business" },
//   { id: "technology", label: "Technology" },
//   { id: "sports", label: "Sports" },
//   { id: "science", label: "Science" },
//   { id: "health", label: "Health" },
//   { id: "entertainment", label: "Entertainment" },
// ];

export function Filters() {
  const filters = useSelector((state: RootState) => state.filters);
  const sources = useSelector((state: RootState) => state.sources);
  const categories = useSelector(
    (state: RootState) => state.filters.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    //console.log("sources", sources);
  }, [sources, dispatch]);

  return (
    <div className="filters">
      <div className="search-input">
        <Search className="search-input__icon" size={16} />
        <SearchBar
          query={filters.searchQuery}
          setQuery={(query) => dispatch(setSearchQuery(query))}
        />
      </div>

      <div className="filters__section">
        <h3 className="filters__title">Sources</h3>
        <div className="chip-group">
          {sources.map((source) => (
            <button
              key={source.id.toString()}
              onClick={() => dispatch(toggleSource(source))}
              className={`chip ${
                filters.sources.includes(source) ? "chip--active" : ""
              }`}
            >
              {source.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__section">
        <h3 className="filters__title">Categories</h3>
        <div className="chip-group">
          {categories.map((category) => (
            <button
              key={category.id.toString()}
              onClick={() => dispatch(toggleCategory(category))}
              className={`chip ${
                filters.categories.some(
                  (c) => c.id === category.id && c.selected
                )
                  ? "chip--active"
                  : ""
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__section">
        <h3 className="filters__title">
          <Calendar size={20} />
          Date Range
        </h3>
        <div className="date-inputs">
          <input
            type="date"
            value={format(
              new Date(filters?.dateFrom || new Date()),
              "yyyy-MM-dd"
            )}
            onChange={(e) => {
              dispatch(
                setDateRange({ from: e.target.value, to: filters.dateTo })
              );
            }}
          />
          <input
            type="date"
            value={format(
              new Date(filters?.dateTo || new Date()),
              "yyyy-MM-dd"
            )}
            onChange={(e) => {
              dispatch(
                setDateRange({ from: filters.dateFrom, to: e.target.value })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
