import React from "react";

export const ProductCardIllustration: React.FC<
  React.SVGProps<SVGSVGElement>
> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 250"
      width="200"
      height="250"
      aria-labelledby="productCardTitle"
      role="img"
      {...props}
    >
      <title id="productCardTitle">E-commerce Product Card Illustration</title>
      {/* Card Background */}
      <rect
        x="5"
        y="5"
        width="180"
        height="240"
        rx="8"
        ry="8"
        fill="#f0f0f0"
        stroke="#e0e0e0"
        strokeWidth="1"
      />

      {/* Image Placeholder */}
      <rect
        x="20"
        y="20"
        width="150"
        height="110"
        fill="#d0d0d0"
        rx="4"
        ry="4"
      />
      <circle cx="95" cy="75" r="25" fill="#b0b0b0" />
      <polygon points="85,95 100,65 115,95" fill="#b0b0b0" />

      {/* Title Placeholder */}
      <rect
        x="15"
        y="155"
        width="155"
        height="15"
        fill="#c0c0c0"
        rx="3"
        ry="3"
      />

      {/* Description/Price Placeholder */}
      <rect
        x="20"
        y="180"
        width="120"
        height="10"
        fill="#d0d0d0"
        rx="2"
        ry="2"
      />
      <rect
        x="20"
        y="195"
        width="80"
        height="10"
        fill="#d0d0d0"
        rx="2"
        ry="2"
      />

      {/* Button Placeholder */}
      <rect
        x="95"
        y="215"
        width="80"
        height="25"
        fill="#a0a0a0"
        rx="4"
        ry="4"
      />
    </svg>
  );
};
