import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <header
      style={{
        backgroundImage:
          "url('https://s3-alpha-sig.figma.com/img/eea3/2795/06b2dd977fecffeb5c95052211c92f0b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CSz9eDVGR1P3qnNq0Be-hQNPrWz6Az~pK-iEVDhjd5FuP1Ectc-VQzk0tyKF0bW60gUyigJqPVxNup-KkTuJFjq5n0ZeKR0r334N29T9hx7Ddv9~YtOJ3dr0057RmSSZS7G-m~ZTq77WHSC04i7WqE3GtXD4DJTAROu4Cz-VN9akcgP5praIlsQapWi4N8fs5RmSYBVjKPKtzVz9i3febbfrdHeZuzCFKtsnFRNUCH-vqxFbW7Ko7z9bL-E0~2TuWk4DYHxkjBe7ES7ej07rRJpX18KiNyIqwrSIf9xP-bgIYyItTpWykMU3w3f3AsDpsax3pPfkaMjcU8trheQCcg__')",
        height: '669px',
        backgroundSize: 'cover',
      }}
    >
      <section className="flex h-full w-full flex-col items-center justify-center bg-white/70 px-4">
        <div className="container mx-auto py-16 md:py-24">
          <div className="max-w-[688px] space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
              Sustainable Corporate Gifts for a Greener Future
            </h1>
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
