import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiQuery, Article, NewsSource } from "../../types";
import { format } from "date-fns";
import { addSource } from "../sources/slice";
// import { addCategory, addSource } from "../filter/slice";

// const apiKey = "0ddb94b973ce499fa95bcaf95a4efe91";
const apiKey = "73bc66ed028d40b28e50d50c078f8c9f";
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2",
  }),
  endpoints: (builder) => ({
    getNewsArticles: builder.query<Article[], ApiQuery>({
      query: ({ query, from, to, source, category, pageSize }) => {
        const params: Record<string, string> = {
          q: query || "",
          sortBy: "publishedAt",
        };

        params["apiKey"] = apiKey;
        if (!query && !source && !category) {
          params.country = "us";
        }

        if (from && to) {
          const fromDate = format(new Date(from), "yyyy-MM-dd");
          const toDate = format(new Date(to), "yyyy-MM-dd");
          params.from = fromDate;
          params.to = toDate;
        }
        if (category && category.searchKey === "news-api") {
          params.category = category.id.toString();
        } else if (source && source.searchKey === "news-api") {
          params.sources = source.id;
        }
        if (pageSize) {
          params.pageSize = pageSize.toString();
        }

        const queryString = new URLSearchParams(params).toString();
        console.log("query", queryString);
        return `/top-headlines?${queryString}`;
      },
      transformResponse: (response: { articles: Article[] }) => {
        return response.articles.map((article) => {
          return {
            ...article,
            source: {
              id: article.source.id,
              name: article.source.name,
              searchKey: "news-api",
            },
          };
        });
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;

        result.data.map((article) => {
          console.log("article", article);
          if (article.source.id && article.source.name) {
            console.log("article-source", article.source.name);
            dispatch(
              addSource({
                id: article.source.id,
                name: article.source.name,
                searchKey: "news-api",
              })
            );
          }
          //return article.source;
        });
        // result.data.map((article: Article) => {
        //   if (article.category?.id && article.category?.label) {
        //     console.log("article", article.category?.label);
        //     dispatch(
        //       addCategory({
        //         id: article.category.id,
        //         label: article.category.label,
        //         searchKey: "news-api",
        //       })
        //     );
        //   }
        // });
      },
    }),
    getNewsSources: builder.query<NewsSource[], void>({
      query: () => `/sources?apiKey=${apiKey}`,
      transformResponse: (response: { sources: NewsSource[] }) => {
        return response.sources.map((source) => ({
          id: source.id,
          name: source.name,
          searchKey: "news-api",
        }));
      },

      //   async onQueryStarted(_, { dispatch }): Promise<void> {
      //     const response = await dispatch(
      //       newsApi.endpoints.getNewsSources.initiate()
      //     );
      //     console.log(response);
      //   },
    }),
  }),
});

export const { useGetNewsArticlesQuery, useGetNewsSourcesQuery } = newsApi;
