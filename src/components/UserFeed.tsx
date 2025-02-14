import { useGetGuardianArticlesQuery } from "../features/articles/guardianApi";
import { useGetNewsArticlesQuery } from "../features/articles/newsApi";
import { useGetNYTArticlesQuery } from "../features/articles/nytApi";
import { Article, NewsSource } from "../types";
import { NewsCard } from "./NewsCard";

const UserFeed = ({ source }: { source: NewsSource }) => {
  const guardian = useGetGuardianArticlesQuery({
    source,
    query: "",
    from: "",
    to: "",
  });

  const news = useGetNewsArticlesQuery({
    source,
    query: "",
    from: "",
    to: "",
  });

  const nyt = useGetNYTArticlesQuery({
    source: source,
    query: "",
    from: "",
    to: "",
  });

  if (!source.searchKey) return null;

  let data: Article[] = [];
  let isLoading = false;
  let isError = false;

  switch (source.searchKey) {
    case "guardian-api":
      data = guardian.data ?? [];
      isLoading = guardian.isLoading;
      isError = guardian.isError;
      break;
    case "news-api":
      data = news.data ?? [];
      isLoading = news.isLoading;
      isError = news.isError;
      break;
    case "nyt-api":
      data = nyt.data ?? [];
      isLoading = nyt.isLoading;
      isError = nyt.isError;
      break;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div></div>;

  return (
    <section className="news-grid category-section">
      {data.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </section>
  );
};

export default UserFeed;
