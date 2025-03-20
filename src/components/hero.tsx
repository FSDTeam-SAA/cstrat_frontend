import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-gray-100 relative  mx-auto">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-16 md:py-24">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Sustainable Corporate Gifts for a Greener Future
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Enhance your brand identity with our curated selection of
            eco-friendly corporate gifts that make a lasting impression while
            caring for our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-gray-800"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[300px] md:h-auto">
          <div className="absolute inset-0 bg-black/5 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=600&width=800')",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
