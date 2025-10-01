import React from "react";

interface ItemsSectionProps {
  items: string[];
  title: string;
  variant?: "crops" | "certifications";
}

export default function ItemsSection({
  items,
  title,
  variant = "crops",
}: ItemsSectionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "certifications":
        return {
          containerClass: "bg-blue-100 text-blue-800 border-blue-200",
          iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        };
      case "crops":
      default:
        return {
          containerClass: "bg-green-100 text-green-800 border-green-200",
          iconPath:
            "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${styles.containerClass}`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={styles.iconPath}
              />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
