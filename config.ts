const serverConfig = {
  baseUrl: "https://next-eight-phi-26.vercel.app",
  baseUrlApi: "http://localhost:3000/api",
};

const colors = [
  "#D14124", // Dark Orange
  "#1F8C34", // Dark Green
  "#1E3399", // Dark Blue
  "#B3248A", // Dark Pink
  "#1A8C8C", // Dark Cyan
  "#B3B324", // Dark Yellow
];

export const config = {
  server: {
    ...serverConfig,
  },
  api: {
    guardianApi: {
      apiKey: "test",
      baseUrl: "https://content.guardianapis.com/search",
      imageUrl: `${serverConfig.baseUrl}/images/guardian.jpg`,
    },
    newsApi: {
      apiKey: "test",
      baseUrl: "https://newsapi.org/v2/top-headlines",
    },
    nyTimesApi: {
      apiKey: "test",
      baseUrl: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      imageUrl: `${serverConfig.baseUrl}/images/nytimes.jpg`,
    },
  },
  sources: [
    {
      id: "guardian",
      name: "The Guardian",
      searchKey: "guardian-api",
      imageUrl: `${serverConfig.baseUrl}/images/guardian.jpg`,
    },
    {
      id: "nytimes",
      name: "New York Times",
      searchKey: "nyt-api",
      imageUrl: `${serverConfig.baseUrl}/images/nyt.jpg`,
    },
  ],

  categories: [
    {
      id: "business",
      label: "Business",
      searchKey: "news-api",
      color: colors[0],
      imageUrl: `${serverConfig.baseUrl}/images/business.jpg`,
    },
    {
      id: "technology",
      label: "Technology",
      searchKey: "news-api",
      color: colors[1],
      imageUrl: `${serverConfig.baseUrl}/images/technology.jpg`,
    },
    {
      id: "sports",
      label: "Sports",
      searchKey: "news-api",
      color: colors[2],
      imageUrl: `${serverConfig.baseUrl}/images/sports.jpg`,
    },
    {
      id: "science",
      label: "Science",
      searchKey: "news-api",
      color: colors[3],
      imageUrl: `${serverConfig.baseUrl}/images/science.jpg`,
    },
    {
      id: "health",
      label: "Health",
      searchKey: "news-api",
      color: colors[4],
      imageUrl: `${serverConfig.baseUrl}/images/health.jpg`,
    },
    {
      id: "entertainment",
      label: "Entertainment",
      searchKey: "news-api",
      color: colors[5],
      imageUrl: `${serverConfig.baseUrl}/images/entertainment.jpg`,
    },
  ],
};
