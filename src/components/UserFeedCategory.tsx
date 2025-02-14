import { useGetNewsArticlesQuery } from "../features/articles/newsApi";

import { Category } from "../types";
import { NewsCard } from "./NewsCard";

const CategorySection = ({ category }: { category: Category }) => {
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
      <h2
        className="section-title category brand-text"
        style={{ color: category.color }}
      >
        {category.label}
      </h2>
      <div className="news-grid-3">
        {data?.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </section>
  );
};

const UserFeedCategory = ({ categories }: { categories: Category[] }) => {
  return (
    <>
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </>
  );
};

export default UserFeedCategory;
