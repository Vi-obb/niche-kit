"use client";

import { Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCardTwoProps {
  image?: string;
  title?: string;
  price?: number;
  salePrice?: number;
  sku?: string;
  rating?: number;
  onAddToCart?: () => void;
  onQuickView?: () => void;
  className?: string;
}

const data = {
  image: "/donut.webp",
  title: "Donut",
  price: 299.99,
  salePrice: 149.99,
  sku: "WH-1000XM4",
  rating: 4,
  onAddToCart: () => console.log("Added to cart"),
  onQuickView: () => console.log("Quick view opened"),
};

export function ProductCardTwo({
  image = data.image,
  title = data.title,
  price = data.price,
  salePrice = data.salePrice,
  sku = data.sku,
  rating = data.rating,
  onAddToCart = data.onAddToCart,
  onQuickView = data.onQuickView,
  className,
}: ProductCardTwoProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-background",
        className
      )}
      role="article"
      aria-labelledby={`product-${sku}`}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-1/3">
        <Image
          src={image}
          alt={title || "Product image"}
          width={300}
          height={200}
          className="w-full h-48 md:h-40 object-cover rounded"
        />
        {salePrice && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-sans font-medium px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="flex-1 pl-0 md:pl-4 pt-4 md:pt-0 flex flex-col justify-between">
        <div>
          <h3
            id={`product-${sku}`}
            className="text-lg font-semibold font-sans text-foreground"
          >
            {title}
          </h3>
          <p className="text-sm font-mono text-muted-foreground">SKU: {sku}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-base font-sans text-foreground">
              ${salePrice ? salePrice.toFixed(2) : price.toFixed(2)}
            </span>
            {salePrice && (
              <span className="text-sm font-sans text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          {rating && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">{rating} out of 5 stars</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={onAddToCart}
            variant="default"
            size="sm"
            className="flex-1 font-sans"
            aria-label={`Add ${title} to cart`}
          >
            Add to Cart
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={onQuickView}
                variant="outline"
                size="sm"
                className="font-sans"
                aria-label={`Quick view of ${title}`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
