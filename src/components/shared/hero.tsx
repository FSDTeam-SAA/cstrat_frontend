import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <header
      style={{
        backgroundImage: "url('/images/shop-hero.png')",
        height: '669px',
        backgroundSize: 'cover',
      }}
    >
      <section className="flex h-full w-full flex-col items-center justify-center bg-white/50 px-4">
        <div className="container mx-auto py-16 md:py-24">
          <div className="max-w-[688px] space-y-6">
            <h1 className="title">Sustainable Corporate Gifts for a Greener Future</h1>
            <p className="text-lg text-black">
              Enhance your brand identity with our curated selection of eco-friendly corporate gifts that make a lasting
              impression while caring for our planet.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800"></Button>
              <Button effect="gooeyLeft">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-black bg-transparent">
                <Link href="/contact">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
