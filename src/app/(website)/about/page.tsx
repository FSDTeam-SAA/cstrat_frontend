import { PageHeader } from '@/components/shared/page-header';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="About Us"
        description="Drip-Swag: Where Style Meets Strategy in Branded Merch."
        backgroundImage="/images/about-hero.png"
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-3xl font-bold md:text-4xl">About Drip Swag</h1>
            <p className="mb-6 text-gray-600">
              Founded with a vision to redefine promotional swag, Drip-Swag started as a creative hub for bold brands seeking more than basic giveaways.
              Inspired by the &quot;drip culture of high-fashion flair, we&apoch;ve grown into a full-service powerhouse since 2020.
            </p>
            <p className="mb-6 text-gray-600">
              Drawing from innovative leaders in the industry, we blend creative customization (like Vox&apoch;s unique voice-building) with sustainable, thoughtful gifting
              (echoing Clove & Twine&apoch;s planet-positive ethos). Our team of brand stylists and marketing pros works with businesses of all sizes—from startups to enterprises—
              to craft merch that resonates.
            </p>
            <p className="mb-6 text-gray-600">
              We&apoch;re not just vendors; we&apoch;re partners in your success, offering end-to-end solutions: design, sourcing, importing, web stores, and fulfillment.
              With a commitment to quality and results, we&apoch;ve helped hundreds of clients create swag that sparks conversations, fosters loyalty, and drives growth.
            </p>
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="mb-6 text-gray-600">
              To make swag that doesn’t just promote—it inspires. We believe branded merchandise should be beautiful, thoughtful, and effective.
              Drip-Swag is here to help you elevate your brand presence with memorable merch that speaks for itself.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/images/about.png"
              alt="Team collaboration"
              width={500}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">What We Offer</h2>
          <p className="mb-4 text-gray-600">
            We provide full-service branded merch solutions tailored to your business goals—from creative concepting to global delivery.
          </p>
          <ul className="mb-4 space-y-4">
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Creative Edge:</span>
                Custom manufacturing for retail-quality apparel, bags, and accessories.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Global Reach:</span>
                Direct importing and worldwide shipping for seamless scalability.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Client-Centric:</span>
                Personalized service that turns challenges into standout campaigns.
              </div>
            </li>
          </ul>
        </div>

        {/* Empowering Local Businesses Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Empowering Brands That Want to Stand Out</h2>
          <p className="mb-4 text-gray-600">
            Whether you&apoch;re a startup onboarding your first hires or an enterprise hosting global events, we help you create branded moments that connect, inspire, and leave a lasting impact.
          </p>
          <ul className="mb-4 space-y-4">
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Events & Trade Shows:</span>
                Wow attendees with memorable, high-quality swag setups.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Employee Onboarding:</span>
                Build culture with curated kits and thoughtful gifts for your team.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Client Gifting:</span>
                Show appreciation with premium, branded packages that build loyalty.
              </div>
            </li>
          </ul>
        </div>

        {/* Our Commitment Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Our Commitment</h2>
          <p className="text-gray-600">
            We’re committed to excellence in every detail—from sourcing premium eco-friendly materials to ensuring smooth global fulfillment.
            Our goal is simple: to create merch that your recipients love and your brand is proud of.
          </p>
        </div>

        {/* Join Us Section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Ready to Drip?</h2>
          <p className="mb-4 text-gray-600">
            Join hundreds of businesses who’ve elevated their brand with custom swag that turns heads. Whether you&apoch;re just starting or scaling big, we&apoch;re here to help you stand out.
          </p>
          <p className="text-gray-600">
            Let’s build something amazing together. Contact us today and make your next campaign drip with excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
