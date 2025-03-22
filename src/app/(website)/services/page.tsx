import { PageHeader } from '@/components/shared/page-header';

export default function ServicesPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Our Services"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Services', href: '/services' },
        ]}
      />

      <div className="container py-12">
        {/* Services content goes here */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="mb-2 text-xl font-bold">Business Strategy</h2>
            <p className="text-gray-600">We help businesses develop effective strategies for growth and success.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-2 text-xl font-bold">Financial Planning</h2>
            <p className="text-gray-600">Our financial experts will help you plan for a secure financial future.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-2 text-xl font-bold">Marketing Solutions</h2>
            <p className="text-gray-600">
              Effective marketing strategies to help your business reach its target audience.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-2 text-xl font-bold">Digital Transformation</h2>
            <p className="text-gray-600">We guide businesses through the process of digital transformation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
