import { PageHeader } from '@/components/shared/page-header';

export default function BusinessStrategyPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Business Strategy"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Services', href: '/services' },
          { label: 'Business Strategy', href: '/services/business-strategy' },
        ]}
      />

      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">Our Business Strategy Services</h2>
          <p className="mb-4">
            Our business strategy consulting services help organizations develop and execute strategies that drive
            growth, improve competitiveness, and increase profitability.
          </p>
          <p className="mb-4">
            We work closely with leadership teams to understand their unique challenges and opportunities, and develop
            tailored strategies that align with their vision and goals.
          </p>

          <h3 className="mb-4 mt-8 text-xl font-bold">Our Approach</h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>Comprehensive market and competitive analysis</li>
            <li>Identification of growth opportunities</li>
            <li>Development of strategic initiatives</li>
            <li>Implementation planning and execution support</li>
            <li>Performance measurement and optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
