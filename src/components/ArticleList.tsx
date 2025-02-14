import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Article } from "../types";
import { RootState } from "../store";
import { NewsCard } from "./NewsCard";

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const filters = useSelector((state: RootState) => state.filters);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Filter by selected sources
      if (filters.sources.length > 0) {
        const sourceMatch = filters.sources.some(
          (source) =>
            source.id === article.source.id &&
            source.searchKey === article.source?.searchKey
        );
        if (!sourceMatch) return false;
      }

      // Filter by selected categories
      if (filters.categories.some((cat) => cat.selected)) {
        const categoryMatch = filters.categories.some(
          (category) =>
            category.selected &&
            category.id === article.category?.id &&
            category.searchKey === article.category?.searchKey
        );
        if (!categoryMatch) return false;
      }

      return true;
    });
  }, [articles, filters.sources, filters.categories]);

  return (
    <section className="news-grid">
      {filteredArticles.map((article, index) => (
        <NewsCard key={article.url + index} article={article} />
      ))}
    </section>
  );
}
