import { NewsSource } from "../types";
import { SelectionCard } from "./SelectionCard";

interface NewsApiSourceProps {
  source: NewsSource;
  isSelected: boolean;

  onClick: () => void;
}

export const NewsApiSource: React.FC<NewsApiSourceProps> = ({
  source,
  isSelected,
  onClick,
}) => {
  //   const { data: articles, isLoading } = useGetNewsArticlesQuery({
  //     query: "",
  //     from: "",
  //     to: "",
  //     source: source,
  //     pageSize: 1,
  //   });

  return (
    <SelectionCard
      key={source.id}
      title={source.name}
      imageUrl={source.imageUrl}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
};
