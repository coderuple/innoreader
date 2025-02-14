import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiQuery, Article, NewsSource } from "../../types";
import { addSource } from "../sources/slice";
import { config } from "../../../config";
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.server.baseUrlApi,
  }),
  endpoints: (builder) => ({
    getNewsArticles: builder.query<Article[], ApiQuery>({
      query: ({ query, from, to, source, category, pageSize }) => {
        const params: Record<string, string> = {
          q: query || "",
          sortBy: "publishedAt",
        };

        if (!query && !source && !category) {
          params.country = "us";
        }

        if (from && to) {
          params.from = from;
          params.to = to;
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
        return `/top-headlines?${queryString}`;
      },
      transformResponse: (response: { articles: Article[] }) => {
        return response.articles.map((article) => ({
          ...article,
          source: {
            ...article.source,
            searchKey: "news-api",
          },
        }));
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;

        result.data.map((article) => {
          // console.log("article", article);
          if (article.source.id && article.source.name) {
            // console.log("article-source", article.source.name);
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
      },
    }),
    getNewsSources: builder.query<NewsSource[], void>({
      query: () => `/sources`,
      transformResponse: (response: { sources: NewsSource[] }) => {
        return response.sources.map((source) => ({
          id: source.id,
          name: source.name,
          searchKey: "news-api",
        }));
      },
    }),
  }),
});

export const { useGetNewsArticlesQuery, useGetNewsSourcesQuery } = newsApi;
