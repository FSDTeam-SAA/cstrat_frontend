import BestSellers from "@/components/best-sellers";
import BrandShowcase from "@/components/brand-showcase";
import Categories from "@/components/categories";
import ClientReviews from "@/components/client-reviews";
import CorporateGifting from "@/components/corporate-gifting";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <BrandShowcase />
      <BestSellers />
      <CorporateGifting />
      <Categories />
      <ClientReviews />
    </div>
  );
}
