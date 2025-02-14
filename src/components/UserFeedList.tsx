// import { useAppSelector } from "../hooks";
// import { RootState } from "../store";

import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import UserFeed from "./UserFeed";
import UserFeedCategory from "./UserFeedCategory";

// import { NewsCard } from "./NewsCard";

const UserFeedList = () => {
  const { preferredSources, preferredCategories } = useAppSelector(
    (state: RootState) => state.preferences
  );

  const combinedElements: React.ReactNode[] = [];

  preferredSources.forEach((source, index) => {
    combinedElements.push(
      <UserFeed source={source} key={`feed-${source.id}-${index}`} />
    );

    if ((index + 1) % 2 === 0 && preferredCategories[Math.floor(index / 2)]) {
      combinedElements.push(
        <UserFeedCategory
          category={preferredCategories[Math.floor(index / 2)]}
          key={`category-${index}`}
        />
      );
    }
  });

  return <>{combinedElements}</>;
};

export default UserFeedList;
