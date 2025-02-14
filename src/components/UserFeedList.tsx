// import { useAppSelector } from "../hooks";
// import { RootState } from "../store";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { NewsCarousel } from "./NewsCarousel";
import UserFeed from "./UserFeed";
import UserFeedCategory from "./UserFeedCategory";

// import { NewsCard } from "./NewsCard";

const UserFeedList = () => {
  const { preferredSources, preferredCategories } = useAppSelector(
    (state: RootState) => state.preferences
  );

  const combinedElements: React.ReactNode[] = [];

  combinedElements.push(
    <NewsCarousel
      categories={preferredCategories}
      key={`carousel-${preferredCategories.length}`}
    />
  );

  preferredSources.forEach((source, index) => {
    combinedElements.push(
      <UserFeed source={source} key={`feed-${source.id}-${index}`} />
    );

    combinedElements.push(
      <UserFeedCategory
        categories={preferredCategories}
        key={`category-${index}`}
      />
    );
  });

  return <>{combinedElements}</>;
};

export default UserFeedList;
