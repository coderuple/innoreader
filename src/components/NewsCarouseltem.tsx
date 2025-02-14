import { Category } from "../types";
import { useGetNewsArticlesQuery } from "../features/articles/newsApi";

interface NewsCarouselItemProps {
  category: Category;
}

export function NewsCarouselItem({ category }: NewsCarouselItemProps) {
  const { data, isLoading, isError } = useGetNewsArticlesQuery({
    category,
    pageSize: 1,
    query: "",
    from: "",
    to: "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data?.[0]) return null;

  const article = data[0];

  return (
    <div className="carousel__content">
      {article.urlToImage && (
        <img
          loading="lazy"
          src={article.urlToImage}
          alt={article.title}
          className="carousel__image"
        />
      )}
      <div className="carousel__overlay">
        <div className="carousel__text">
          <span
            className="carousel__category"
            style={{ backgroundColor: category?.color }}
          >
            {category.label}
          </span>
          <h2 className="carousel__title">{article.title}</h2>
          <p className="carousel__description">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="carousel__link"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
