// import BestSellers from "@/components/best-sellers";
import BrandShowcase from '@/components/shop/brand-showcase';
// import Categories from "@/components/categories";
// import ClientReviews from "@/components/client-reviews";
// import CorporateGifting from "@/components/corporate-gifting";
import Hero from '@/components/shared/hero';

export default function Home() {
  return (
    <div className="">
      <Hero />
      <BrandShowcase />
      {/* 
      <BestSellers />
      <CorporateGifting />
      <Categories />
      <ClientReviews /> */}
    </div>
  );
}
