import ProductCardOne from "@/registry/ecomm/product-card-01/product-card-01";

export default function Homepage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <ProductCardOne
        name="Donut"
        price="$2,95"
        imageUrl="/donut.webp"
        isFavorite={false}
      />
    </div>
  );
}
