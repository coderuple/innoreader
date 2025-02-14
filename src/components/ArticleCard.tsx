import React from "react";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="article-card">
      <img
        src={article.urlToImage || "https://via.placeholder.com/150"}
        alt={article.title}
        className="article-image"
      />
      <div className="article-details">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
