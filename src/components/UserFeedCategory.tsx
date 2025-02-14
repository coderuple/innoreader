import { useGetNewsArticlesQuery } from "../features/articles/newsApi";

import { Category } from "../types";
import { NewsCard } from "./NewsCard";

const UserFeedCategory = ({ category }: { category: Category }) => {
  const { data, isLoading, isError } = useGetNewsArticlesQuery({
    category: category,
    query: "",
    from: "",
    to: "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section className="category-section">
      <h2 className="section-title category brand-text">{category.label}</h2>
      <div className="news-grid-3">
        {data?.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </section>
  );
};

export default UserFeedCategory;
