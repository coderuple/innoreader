import { Check, Plus } from "lucide-react";

interface SelectionCardProps {
  title: string;
  imageUrl?: string;
  isSelected: boolean;
  onClick: () => void;
}

export function SelectionCard({
  title,
  imageUrl,
  isSelected,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`selection-card ${
        isSelected ? "selection-card--selected" : ""
      }`}
    >
      <div className="selection-card__image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="selection-card__image" />
        ) : (
          <div className="selection-card--selected"></div>
        )}
        <div className="selection-card__overlay">
          {isSelected ? (
            <Check className="selection-card__icon" size={24} />
          ) : (
            <Plus className="selection-card__icon" size={24} />
          )}
          <h3 className="selection-card__title">{title}</h3>
        </div>
      </div>
    </button>
  );
}
