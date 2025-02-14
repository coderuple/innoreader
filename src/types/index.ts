export interface Article {
  category?: CategoryOption;
  id?: string;
  source: {
    searchKey: string | undefined;
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

export interface NytArticleType {
  response: {
    docs: Array<{
      byline: { original: string };
      headline: { main: string };
      abstract: string;
      web_url: string;
      multimedia?: Array<{ url: string }>;
      pub_date: string;
      subsection_name: string;
    }>;
  };
}

export type SearchKey = "news-api" | "guardian-api" | "nyt-api";
export type NewsSource = {
  id: string;
  name: string;
  searchKey?: SearchKey;

  imageUrl?: string;
};
export interface Category {
  id: string;
  label: string;
  searchKey: SearchKey;

  imageUrl?: string;
}

export type NewsSourceOption = {
  id: string;
  selected?: boolean;
} & NewsSource;

export type CategoryOption = {
  id: string;
  selected?: boolean;
} & Category;

export interface NewsFilters {
  sources: NewsSourceOption[];
  categories: CategoryOption[];
  searchQuery: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface GuardianArticleType {
  response: {
    results: Array<{
      webTitle: string;
      webUrl: string;
      sectionId: string;
      sectionName: string;
      webPublicationDate: string;
      fields?: {
        thumbnail?: string;
        trailText?: string;
      };
    }>;
  };
}

export interface ApiQuery {
  query: string;
  from: string | null;
  to: string | null;
  source?: NewsSource;
  category?: CategoryOption;
  searchKey?: SearchKey;
  pageSize?: number;
}
