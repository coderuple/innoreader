import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { Article } from "../types";

interface NewsCardProps {
  article: Article;
  style?: React.CSSProperties;
}

export function NewsCard({ article, style }: NewsCardProps) {
  return (
    <article className="news-card" style={style}>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          loading="lazy"
          alt={article.title}
          className="news-card__image"
        />
      )}
      <div className="news-card__content">
        <div className="news-card__meta">
          <span>{article.source.name}</span>
          <span>{format(new Date(article.publishedAt), "MMM d, yyyy")}</span>
        </div>
        <h2 className="news-card__title">{article.title}</h2>
        <p className="news-card__description">{article.description}</p>
        <div className="news-card__footer">
          {article.author && (
            <span className="news-card__author">
              {article.author}
              {article.author.includes("By") ? "" : "By"}
            </span>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card__link"
          >
            Read more <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
