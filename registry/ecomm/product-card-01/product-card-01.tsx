"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardOneProps {
  name: string;
  price: string;
  imageUrl: string;
  isFavorite?: boolean;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
}

export default function ProductCardOne({
  name,
  price,
  imageUrl,
  isFavorite = false,
  onAddToCart = () => {},
  onToggleFavorite = () => {},
}: ProductCardOneProps) {
  return (
    <Card className="w-full max-w-[240px] overflow-hidden bg-muted">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full p-0 backdrop-blur-sm"
          onClick={onToggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-black text-black" : "text-gray-500"
            }`}
          />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <div className="relative h-[160px] w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <CardContent className="p-3 pb-0">
        <h3 className="text-base font-medium">{name}</h3>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3">
        <p className="text-lg font-medium">{price}</p>
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 rounded-md bg-black p-0"
          onClick={onAddToCart}
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
