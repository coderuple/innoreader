import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiQuery, Article, GuardianArticleType } from "../../types";
import { addSource } from "../sources/slice";
import { format } from "date-fns";
import { addCategory } from "../filter/slice";
import { config } from "../../../config";

export const guardianApi = createApi({
  reducerPath: "guardianApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.guardianApi.baseUrl,
  }),
  endpoints: (builder) => ({
    getGuardianArticles: builder.query<Article[], ApiQuery>({
      query: ({ query = "", from, to }) => {
        const params: Record<string, string> = {
          q: query || "",
          "api-key": config.api.guardianApi.apiKey,
          "show-fields": "thumbnail",
          "order-by": "newest",
        };

        if (from && to) {
          const fromDate = format(new Date(from), "yyyy-MM-dd");

          const toDate = format(new Date(to), "yyyy-MM-dd");
          params["from-date"] = fromDate;
          params["to-date"] = toDate;
        }
        const queryString = new URLSearchParams(params).toString();
        return `/search?${queryString}`;
      },
      transformResponse: (response: GuardianArticleType) =>
        response.response.results.map((item) => ({
          source: {
            id: "guardian",
            name: "The Guardian",
            searchKey: "guardian-api",
          },
          author: "",
          title: item.webTitle,
          category: {
            id: item?.sectionId ?? "",
            label: item?.sectionName + " - The Guardian",

            searchKey: "guardian-api",
          },
          description: item.fields?.trailText ?? "",
          url: item.webUrl,
          urlToImage: item.fields?.thumbnail ?? "",
          publishedAt: item.webPublicationDate,
        })),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const result = await queryFulfilled;
        dispatch(
          addSource({
            id: "guardian",
            name: "The Guardian",
            searchKey: "guardian-api",
          })
        );

        result.data.map((article: Article) => {
          if (article.category?.id && article.category?.label) {
            dispatch(
              addCategory({
                id: article.category.id,
                label: article.category.label,
                searchKey: "guardian-api",
              })
            );
          }
        });
      },
    }),
  }),
});

export const { useGetGuardianArticlesQuery } = guardianApi;
