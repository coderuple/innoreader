# Project Innoreader (New Aggregator) By Lotanna Oduonye

API providers are : https://newsapi.org/ , https://developer.nytimes.com and https://open-platform.theguardian.com

React, Redux Toolkit & Redux Toolkit Query,Vanilla CSS.

```
npm install
```

# Development

```
npm run dev
```

I use vite react for development. Here is a link https://innoreader.vercel.app/. The News API is hosted on a server side here is link to the repo https://github.com/coderuple/next/tree/main/app/api and where it is hosted https://next-9v76uevnb-lotanodes-projects.vercel.app/api/sources. I was getting rate limited and I had cors issues from the same origin from localhost. Nextjs will help cache the data and make it more efficient. I also cycled through multiple api keys to get around the rate limit ( Not recommended, this is a for demo only and bad practice).

I have also put the Apik keys in a config folder ( Not recommended, this is a for demo only and bad practice). The News Api keys are local to the server.

User Preferences are stored in localstorage using Redux middleware.

Let me know if you have any questions.

# DOCKER Instructions

# Build stage

```
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
```

# Production stage

```
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```

```
