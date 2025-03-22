import Image from 'next/image';

export default function BrandShowcase() {
  const brands = [
    { name: 'New Balance', logo: '/placeholder.svg?height=50&width=100' },
    { name: 'Puma', logo: '/placeholder.svg?height=50&width=100' },
    { name: 'Calvin Klein', logo: '/placeholder.svg?height=50&width=100' },
    { name: 'Adidas', logo: '/placeholder.svg?height=50&width=100' },
    { name: 'Calvin Klein', logo: '/placeholder.svg?height=50&width=100' },
    { name: 'Adidas', logo: '/placeholder.svg?height=50&width=100' },
    { name: 'Nike', logo: '/placeholder.svg?height=50&width=100' },
    { name: 'Under Armour', logo: '/placeholder.svg?height=50&width=100' },
  ];

  return (
    <section className="w-full py-12">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Brands You Trust, All in One Place.</h2>
        <div className="animate-marquee flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div key={brand.name} className="animate-marquee relative h-12 w-24">
              <Image src={brand.logo || '/placeholder.svg'} alt={brand.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
