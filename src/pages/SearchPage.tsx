import { Filters } from "../components/Filters";
// import { useGetNewsArticlesQuery } from "../features/articles/newsApi";
import { useGetGuardianArticlesQuery } from "../features/articles/guardianApi";
// import { useGetNYTArticlesQuery } from "../features/articles/nytApi";

import Header from "../components/Header";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useGetNewsArticlesQuery } from "../features/articles/newsApi";

import { useGetNYTArticlesQuery } from "../features/articles/nytApi";
import { ArticleList } from "../components/ArticleList";

const HomePage: React.FC = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const fromDate = filters?.dateFrom || format(new Date(), "yyyy-MM-dd");
  const toDate = filters?.dateTo || format(new Date(), "yyyy-MM-dd");

  const {
    data: guardianArticles = [],
    isLoading: guardianIsLoading,
    error: guardianError,
  } = useGetGuardianArticlesQuery({
    query: filters?.searchQuery,
    from: fromDate,
    to: toDate,
  });

  //   const businessQuery = useGetNewsArticlesQuery({
  //     query: filters?.searchQuery,
  //     from: fromDate,
  //     to: toDate,
  //     category: {
  //       id: "business",
  //       label: "Business",
  //       selected: true,
  //       searchKey: "news-api",
  //     },
  //   });
  //   const techQuery = useGetNewsArticlesQuery({
  //     query: filters?.searchQuery,
  //     from: fromDate,
  //     to: toDate,
  //     category: {
  //       id: "technology",
  //       label: "Technology",
  //       selected: true,
  //       searchKey: "news-api",
  //     },
  //   });
  //   const sportsQuery = useGetNewsArticlesQuery({
  //     query: filters?.searchQuery,
  //     from: fromDate,
  //     to: toDate,
  //     category: {
  //       id: "sports",
  //       label: "Sports",
  //       selected: true,
  //       searchKey: "news-api",
  //     },
  //   });
  //   const scienceQuery = useGetNewsArticlesQuery({
  //     query: filters?.searchQuery,
  //     from: fromDate,
  //     to: toDate,
  //     category: {
  //       id: "science",
  //       label: "Science",
  //       selected: true,
  //       searchKey: "news-api",
  //     },
  //   });

  //   const healthQuery = useGetNewsArticlesQuery({
  //     query: filters?.searchQuery,
  //     from: fromDate,
  //     to: toDate,
  //     category: {
  //       id: "health",
  //       label: "Health",
  //       selected: true,
  //       searchKey: "news-api",
  //     },
  //   });

  //   const entertainmentQuery = useGetNewsArticlesQuery({
  //     query: filters?.searchQuery,
  //     from: fromDate,
  //     to: toDate,
  //     category: {
  //       id: "entertainment",
  //       label: "Entertainment",
  //       selected: true,
  //       searchKey: "news-api",
  //     },
  //   });

  const {
    data: nytArticles = [],
    isLoading: nytIsLoading,
    error: nytError,
  } = useGetNYTArticlesQuery({
    query: filters?.searchQuery,
    from: fromDate,
    to: toDate,
  });

  //    const entertainmentQuery = useGetNewsArticlesQuery({
  //      query: filters?.searchQuery,
  //      from: fromDate,
  //      to: toDate,
  //      category: {
  //        id: "entertainment",
  //        label: "Entertainment",
  //        selected: true,
  //        searchKey: "news-api",
  //      },
  //    });

  // Combine results based on selected categories
  //   const categoryResults = useMemo(() => {
  //     const queries: Record<string, typeof businessQuery> = {
  //       business: businessQuery,
  //       technology: techQuery,
  //       sports: sportsQuery,
  //       science: scienceQuery,
  //       health: healthQuery,
  //       entertainment: entertainmentQuery,
  //     };

  //     return (filters.categories || [])
  //       .map((category) => ({
  //         category,
  //         query: queries[category.id as keyof typeof queries],
  //       }))
  //       .filter(
  //         (
  //           result
  //         ): result is {
  //           category: CategoryOption;
  //           query: typeof businessQuery;
  //         } => !!result.query
  //       );
  //   }, [
  //     filters.categories,
  //     businessQuery,
  //     techQuery,
  //     sportsQuery,
  //     scienceQuery,
  //     healthQuery,
  //     entertainmentQuery,
  //   ]);

  // Combine all news articles from different categories
  //   const newsArticles = categoryResults.map((r) => r.query.data || []).flat();
  //   const newsIsLoading = categoryResults.some((r) => r.query.isLoading);
  //   const newsError = categoryResults.some((r) => r.query.error);

  const {
    data: newsArticles,
    isLoading: newsIsLoading,
    error: newsError,
  } = useGetNewsArticlesQuery({
    query: filters?.searchQuery,
    from: fromDate,
    to: toDate,
  });
  const allArticles = [
    ...(!guardianIsLoading ? guardianArticles || [] : []),
    ...(!newsIsLoading ? newsArticles || [] : []),
    ...(!nytIsLoading ? nytArticles || [] : []),
  ].sort(() => Math.random() - 0.5);
  const isLoading = guardianIsLoading || newsIsLoading || nytIsLoading;

  return (
    <div className="search-page">
      <Header />
      <main className="main">
        <div className="container">
          {/* Loading indicators */}
          <div className="status-container">
            {guardianIsLoading && (
              <div className="loading-indicator">
                Loading Guardian articles...
              </div>
            )}
            {newsIsLoading && <div className="loading-indicator"></div>}
            {nytIsLoading && <div className="loading-indicator"></div>}

            {guardianError && <div className="error-indicator"></div>}
            {newsError && <div className="error-indicator"></div>}
            {nytError && <div className="error-indicator"></div>}
          </div>

          <div className="layout">
            <aside>
              <Filters />
            </aside>

            {isLoading ? (
              <div className="loading">Loading articles...</div>
            ) : (
              <ArticleList articles={allArticles} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
