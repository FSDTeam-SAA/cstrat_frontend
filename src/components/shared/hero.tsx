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
          <div className="max-w-[688px] space-y-6 text-center">
            <h1 className="title">Elevate Your Brand with Drip-Worthy Swag</h1>
            <p className="text-lg text-black">
              Premium, Custom Merch That Turns Heads and Builds Loyalty.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
                <Link href="/shop">Shop Curated Collections</Link>
              </Button>
              {/* <Button asChild size="lg" variant="secondary">
                <Link href="/custom-kit">Build Your Custom Kit Now</Link>
              </Button> */}
              <Button asChild variant="outline" size="lg" className="border-black bg-transparent">
                <Link href="/contact">Book a Free Consult</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
