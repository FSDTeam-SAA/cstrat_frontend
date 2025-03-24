import Image from 'next/image';

export default function BrandShowcase() {
  const brands = [
    { name: 'New Balance', logo: '/images/brand-logo-1.png' },
    { name: 'Puma', logo: '/images/brand-logo-2.png' },
    { name: 'Calvin Klein', logo: '/images/brand-logo-3.png' },
    { name: 'Adidas', logo: '/images/brand-logo-4.png' },
    { name: 'Calvin Klein', logo: '/images/brand-logo-5.png' },
    { name: 'Adidas', logo: '/images/brand-logo-3.png' },
    { name: 'Nike', logo: '/images/brand-logo-4.png' },
    { name: 'Under Armour', logo: '/images/brand-logo-5.png' },
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
