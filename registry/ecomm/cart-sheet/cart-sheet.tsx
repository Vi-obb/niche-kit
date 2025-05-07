"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartSheetProps {
  className?: string;
}

export function CartSheet({ className }: CartSheetProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      image: "/donut.webp",
      title: "Wireless Headphones",
      price: 79.99,
      quantity: 1,
    },
    {
      id: "2",
      image: "/donut.webp",
      title: "Bluetooth Speaker",
      price: 49.99,
      quantity: 2,
    },
    {
      id: "3",
      image: "/donut.webp",
      title: "USB-C Cable",
      price: 9.99,
      quantity: 3,
    },
  ]);

  // Handlers
  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Calculate subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn("font-sans", className)}
          aria-label="Open cart"
        >
          Open cart ({items.length})
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right" // Slides from right on desktop
        className="w-full sm:w-[400px] flex flex-col bg-background"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-sans text-foreground">
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-base font-sans text-muted-foreground text-center">
              Your cart is empty.
            </p>
          ) : (
            <ul role="list" className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 border-b pb-4"
                  role="article"
                  aria-labelledby={`cart-item-${item.id}`}
                >
                  <Image
                    width={20}
                    height={20}
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3
                      id={`cart-item-${item.id}`}
                      className="text-base font-semibold font-sans text-foreground"
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm font-mono text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-sans">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="text-base font-sans text-foreground">
              Subtotal
            </span>
            <span className="text-base font-mono text-foreground">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <Button
            variant="default"
            size="lg"
            className="w-full font-sans"
            disabled={items.length === 0}
            aria-label="Proceed to checkout"
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
