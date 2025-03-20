import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import ProductGrid from "@/components/shop/product-grid"
import ProductFilters from "@/components/shop/product-filters"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="relative h-[300px] md:h-[400px] w-full bg-cover bg-center flex flex-col items-center justify-center text-white z-20"
          style={{
            backgroundImage: "url('/images/shop-hero.jpg')",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">{categoryName}</h1>
          <p className="text-xl">Style That Speaks, Comfort That Lasts.</p>
        </div>
      </div>

      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <ProductFilters />
          </div>
          <div className="md:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}

