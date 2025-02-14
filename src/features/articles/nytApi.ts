import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiQuery, Article, NytArticleType } from "../../types";
import { format, subDays } from "date-fns";
import { addSource } from "../sources/slice";
import { addCategory } from "../filter/slice";

const apiKey = "dJAm2TtCuedAQGi0n3FRxLCNyGtyfIQO";
export const nytApi = createApi({
  reducerPath: "nytApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  }),
  endpoints: (builder) => ({
    getNYTArticles: builder.query<Article[] | null, ApiQuery>({
      query: ({ query, from, to }) => {
        const params: Record<string, string> = {
          q: query || "",
          facet: "true",
          "api-key": apiKey,
          sort: "newest",
        };
        if (from && to) {
          let fromDate = format(new Date(from), "yyyy-MM-dd");
          const toDate = format(new Date(to), "yyyy-MM-dd");
          if (fromDate === toDate) {
            fromDate = format(subDays(new Date(from), 1), "yyyyMMdd");
          }
          params["begin_date"] = fromDate;
          params["end_date"] = toDate;
        }

        const queryString = new URLSearchParams(params).toString();

        return `?${queryString}`;
      },

      transformResponse: (response: NytArticleType) => {
        console.log("nyt response", response);
        return response.response.docs.map((doc) => {
          return {
            source: { id: "nyt", name: "New York Times", searchKey: "nyt-api" },
            author: doc.byline?.original ?? "",
            title: doc.headline.main,
            description: doc.abstract ?? "",
            url: doc.web_url,
            urlToImage: doc.multimedia?.[0]?.url
              ? `https://www.nytimes.com/${doc.multimedia[0].url}`
              : "",
            publishedAt: doc.pub_date,
            category: {
              id: doc.subsection_name?.toLowerCase(),
              label: doc.subsection_name,
              searchKey: "nyt-api",
            },
          };
        });
      },
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const result = await queryFulfilled;

        dispatch(
          addSource({ id: "nyt", name: "New York Times", searchKey: "nyt-api" })
        );
        result?.data?.map((article: Article) => {
          if (article.category?.id && article.category?.label) {
            dispatch(
              addCategory({
                id: article.category.id,
                label: article.category.label + " - New York Times",
                searchKey: "nyt-api",
              })
            );
          }
        });
      },
    }),
  }),
});

export const { useGetNYTArticlesQuery } = nytApi;
