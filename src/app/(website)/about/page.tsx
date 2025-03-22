import { PageHeader } from '@/components/shared/page-header';

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="About Us"
        description="Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we'll gladly assist you."
        backgroundImage="/images/about-hero.png"
      />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
            <p className="mb-4 text-lg">
              Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor
              nibh cursus pulvinar diam risus. Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu
              tortor vehicula.
            </p>
            <p className="mb-4 text-lg">
              Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor
              nibh cursus pulvinar diam risus. Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu
              tortor vehicula.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
            <p className="mb-4 text-lg">
              Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu tortor vehicula. Fames dolor
              nibh cursus pulvinar diam risus. Lorem ipsum dolor sit amet consectetur. Nisl ut integer eu sit ipsum arcu
              tortor vehicula.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 text-xl font-bold">Quality</h3>
                <p>We are committed to providing high-quality products that exceed customer expectations.</p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 text-xl font-bold">Sustainability</h3>
                <p>We strive to minimize our environmental impact through sustainable practices.</p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 text-xl font-bold">Innovation</h3>
                <p>We continuously innovate to provide the best products and services to our customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
