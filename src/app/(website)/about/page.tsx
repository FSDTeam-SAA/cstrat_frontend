import { PageHeader } from '@/components/shared/page-header';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="About Us"
        description="Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we'll gladly assist you."
        backgroundImage="/images/about-hero.png"
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-3xl font-bold md:text-4xl">About Drip Swag</h1>
            <p className="mb-6 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor faucibus magna, imperdiet maximus orci
              ultricies a. Cras placerat elit a sagittis tristique. Etiam imperdiet pulvinar nisi in pellentesque. Sed
              ante orci, egestas id quam nec, eleifend varius magna. Fusce massa nisi, aliquam at cursus eu.
            </p>

            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="mb-6 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor faucibus magna, imperdiet maximus orci
              ultricies a. Cras placerat elit a sagittis tristique. Etiam imperdiet pulvinar nisi in pellentesque. Sed
              ante orci, egestas id quam nec, eleifend varius magna. Fusce massa nisi, aliquam at cursus eu.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-4xl font-bold">30K+</h3>
                <p className="text-gray-700">Our Products</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold">12K+</h3>
                <p className="text-gray-700">Satisfied Customers</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold">2K+</h3>
                <p className="text-gray-700">Our Vendor</p>
              </div>
            </div>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
            Suspendisse dictum facilisis ullamcorper.
          </p>
          <ul className="mb-4 space-y-4">
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Lorem ipsum: </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Lorem ipsum: </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Lorem ipsum: </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </div>
            </li>
          </ul>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
            Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
          </p>
        </div>

        {/* Empowering Local Businesses Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Empowering Local Businesses</h2>
          <p className="mb-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
            Suspendisse dictum facilisis ullamcorper.
          </p>
          <ul className="mb-4 space-y-4">
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Lorem ipsum: </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Lorem ipsum: </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </div>
            </li>
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                <span className="font-semibold">Lorem ipsum: </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
                Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </div>
            </li>
          </ul>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
            Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
          </p>
        </div>

        {/* Our Commitment Section */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Our Commitment</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
            Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui. Morbi
            condimentum porttitor turpis sed ultrices. Suspendisse auctor faucibus magna, imperdiet maximus orci
            ultricies a. Cras placerat elit a sagittis tristique. Etiam imperdiet pulvinar nisi in pellentesque. Sed
            ante orci, egestas id quam nec, eleifend varius magna. Fusce massa nisi, aliquam at cursus eu.
          </p>
        </div>

        {/* Join Us Section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Join Us</h2>
          <p className="mb-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
            Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui. Morbi
            condimentum porttitor turpis sed ultrices.
          </p>
          <p className="text-gray-600">
            Suspendisse auctor faucibus magna, imperdiet maximus orci ultricies a. Cras placerat elit a sagittis
            tristique. Etiam imperdiet pulvinar nisi in pellentesque. Sed ante orci, egestas id quam nec, eleifend
            varius magna. Fusce massa nisi, aliquam at cursus eu.
          </p>
        </div>
      </div>
    </div>
  );
}
